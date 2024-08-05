import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from 'src/app/core/services/global.service';
import { ProductService } from 'src/app/core/services/product.service';
import { ColumnsParametroListado, ParametrosAcciones } from 'src/app/theme/components/table/table.component';
import { take } from 'rxjs/operators';
import { ProductModel , ProductFilter, ShopModel} from 'src/app/api-rest';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  columns!: ColumnsParametroListado[];
  columnsName: string[] = [this._translate.instant('products.code'), this._translate.instant('global.name')
  ,this._translate.instant('products.category'),
  this._translate.instant('products.price'),
  this._translate.instant('products.stock'), ''
  , this._translate.instant('global.actions')];
  clases: string[] = ['','','','','hidden md:flex','hidden md:block',''];
  acciones!: ParametrosAcciones[];
  products!: ProductModel[];
  displayedColumns: string[] = ['code','name', 'category','price', 'stock', 'imageList','acciones'];
  totalResult!: any;
  page!: any;
  loadDataFinish: boolean = false;
  currentPage: number = 0;
  currentSize: number = 5;
  currentFilter: ProductFilter = {};
  constructor(private _translate: TranslateService,
    private _global: GlobalService,
    private _router: Router,
    private _product: ProductService){
      this.getProducts();
      this.columns = [
        { col: 'code', type: 'text' },
        { col: 'name', type: 'text' },
        { col: 'category', type: 'object', attribute: 'description'},
        {col: 'price', type: 'price'},
        {col: 'stock', type: 'text'},
        {col: 'imageList', type: 'image'},
        { col: 'acciones', type: 'btn' }
      ];
      this.acciones = [
        { accion: 'EDITAR', nombre: _translate.instant('global.edit'), color: 'primary', icon: 'edit'},
        { accion: 'ELIMINAR', nombre: _translate.instant('global.delete'), color: 'warn', icon: 'delete'}
      ];
    }

    private getFiles(product: ProductModel) {
        if (product.files && product.files?.length > 0) {
        this._product.getFiles(product.files[0])
        .subscribe((fileBlob: Blob) => {
          const productFind: any =  this.products.find(productFind => productFind.id === product.id);
            if (productFind){
              productFind['imageList'] = URL.createObjectURL(fileBlob);
            }
        });
      }
     }


  add() {
    this._router.navigate([`page/product/new`]);
  }

  edit(product: ProductModel) {
    this._router.navigate([`page/product/${product.id}`]);
  }

  delete(product: ProductModel) {
    this._global.confirmDialog(`¿Está seguro de que quiere eliminar el producto ${product.name}?`)
    .then(result => {
      if(result) {
        this._product.deleteById(product.id as string)
        .subscribe(result => {
          if (result) {
            this._global.openSnackBar('Se ha eliminado correctamente el producto', 'Producto');
            this.getProducts();
          }

        });
      }
    });
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

  getProducts(filter?: ProductFilter) {
    const shop: ShopModel = this._global.getShop() as ShopModel;
    if(!shop) {
      this._global.openSnackBar(this._translate.instant('global.msgs.shopSelectedRequired'), 'error');
      this._router.navigate(['/page/home']);
    }
    if (filter && filter.page === undefined && this.currentFilter.page != undefined) {
      filter.page = this.currentFilter.page;
    }
    if (filter && filter.numberResult === undefined && this.currentFilter.numberResult != undefined) {
      filter.numberResult = this.currentFilter.numberResult;
    }
    this.currentFilter = filter ? filter as ProductFilter : this.currentFilter;
    this._product.getAllByFilter(shop.id as string, this.currentFilter)
    .pipe(take(1))
    .subscribe(products => {
      this.products = products.products as ProductModel[];
      this.page = products.page;
      this.totalResult = products.totalResult;
      this.products.forEach(product => {
        this.getFiles(product);
        if (product.id === this.products[this.products.length - 1].id) {
          this.loadDataFinish = true;
        }
      });
    });
  }

  handlerEventPage(pagination: {length: number, pageIndex: number, pageSize: number, previousPageIndex: number}) {
    this.currentFilter.page = pagination ? pagination.pageIndex : 0;
    this.currentFilter.numberResult = pagination ? pagination.pageSize : 5;
    this.getProducts();
  }
}
