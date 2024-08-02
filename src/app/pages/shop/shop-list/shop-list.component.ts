import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ShopModel } from 'src/app/api-rest';
import { GlobalService } from 'src/app/core/services/global.service';
import { ShopService } from 'src/app/core/services/shop.service';
import { ColumnsParametroListado, ParametrosAcciones } from 'src/app/theme/components/table/table.component';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent {

  shops!: ShopModel[];
  columns!: ColumnsParametroListado[];
  columnsName: string[] = [this._translate.instant('global.name'),
  this._translate.instant('shops.url'),
  this._translate.instant('shops.online'),
  this._translate.instant('global.actions')];
  clases: string[] = [];
  acciones!: ParametrosAcciones[];
  displayedColumns: string[] = ['name', 'url','online','acciones'];
  constructor(private _router: Router,
    private _translate: TranslateService,
    private _shop: ShopService,
    private _global: GlobalService) {
      this.getShops();
      this.columns = [
        { col: 'name', type: 'text' },
        { col: 'url', type: 'text' },
        { col: 'online', type: 'boolean' },
        { col: 'acciones', type: 'btn' }
      ];
      this.acciones = [
        { accion: 'EDITAR', nombre: _translate.instant('global.edit'), color: 'primary', icon: 'edit'},
        { accion: 'ELIMINAR', nombre: _translate.instant('global.delete'), color: 'warn', icon: 'delete'}
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

  edit(shop: ShopModel) {
    this._router.navigate([`page/shop/${shop.id}`]);
  }

  delete(shop: ShopModel) {
    this._global.confirmDialog(`¿Está seguro de que quiere eliminar la tienda ${shop.name}?`)
    .then(result => {
      if(result) {
        this._shop.deleteById(shop.id as string)
        .subscribe(result => {
          if (result) {
            this._global.openSnackBar('Se ha eliminado correctamente la tienda', 'Tienda');
            this.getShops();
          }
        });
      }
    });
  }

  add() {
    this._router.navigate(['page/shop/new']);
  }

  getShops(){
    this._shop.getAll()
    .subscribe(shops => this.shops = shops);
  }
}
