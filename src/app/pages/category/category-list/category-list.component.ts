import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CategoryModel, ShopModel } from 'src/app/api-rest';
import { CategoryService } from 'src/app/core/services/category.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { ColumnsParametroListado, ParametrosAcciones } from 'src/app/theme/components/table/table.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {

  columns!: ColumnsParametroListado[];
  columnsName: string[] = [this._translate.instant('global.name'),
   this._translate.instant('global.description'),
   this._translate.instant('categories.categoryParent'),
   this._translate.instant('global.actions')];
  clases: string[] = [];
  acciones!: ParametrosAcciones[];
  categories!: CategoryModel[];
  displayedColumns: string[] = ['name', 'description','categoryParentName','acciones'];

  constructor(private _category: CategoryService,
    private _router: Router,
    private _global: GlobalService,
    private _translate: TranslateService) {
    this.getCategories();
    this.columns = [
      { col: 'name', type: 'text' },
      { col: 'description', type: 'text' },
      { col: 'categoryParentName', type: 'text' },
      { col: 'acciones', type: 'btn' }
    ];
    this.acciones = [
      { accion: 'EDITAR', nombre: this._translate.instant('global.edit'), color: 'primary', icon: 'edit'},
      { accion: 'ELIMINAR', nombre: this._translate.instant('global.delete'), color: 'warn', icon: 'delete'}
    ];
  }


  accionar(event: {accion: string, row: any}) {
    switch(event.accion) {
      case 'EDITAR' :
        this.edit(event.row);
        break;
      case 'ELIMINAR':
        this.delete(event.row);
        break;
    }
  }

  edit(category: CategoryModel) {
    this._router.navigate([`page/category/${category.id}`]);
  }

  delete(category: CategoryModel) {
    this._global.confirmDialog(`¿Está seguro de que quiere eliminar la categoria ${category.name}?`)
    .then(result => {
      if(result) {
        this._category.deleteById(category.id as string)
        .subscribe(result => {
          if (result) {
            this._global.openSnackBar('Se ha eliminado correctamente la categoria', 'Usuario');
            this.getCategories();
          }
        });
      }
    });
  }

  add() {
    this._router.navigate(['page/category/new']);
  }

  private getCategories() {
    const shop: ShopModel = this._global.getShop() as ShopModel;
    if (!shop) {
      this._global.openSnackBar(this._translate.instant('global.msgs.shopSelectedRequired'), 'error');
      this._router.navigate(['/page/home']);
    }
    this._category.getAllByFilter(shop.id as string)
    .subscribe(categories => this.categories = categories.categories as CategoryModel[]);
  }
}
