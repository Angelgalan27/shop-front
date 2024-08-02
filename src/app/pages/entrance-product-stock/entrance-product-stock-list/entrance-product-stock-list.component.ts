import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EntranceProductStockModel, ShopModel } from 'src/app/api-rest';
import { EntranceProductStockService } from 'src/app/core/services/entrance-product-stock.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { ColumnsParametroListado, ParametrosAcciones } from 'src/app/theme/components/table/table.component';

@Component({
  selector: 'app-entrance-product-stock-list',
  templateUrl: './entrance-product-stock-list.component.html',
  styleUrls: ['./entrance-product-stock-list.component.scss']
})
export class EntranceProductStockListComponent {

  columns!: ColumnsParametroListado[];
  columnsName: string[];
  acciones!: ParametrosAcciones[];
  displayedColumns: string[] = ['product','provider','totalUnits', 'totalCost','buyPriceUnit','acciones'];
  totalResult!: any;
  page!: any;
  clases: string[] = [];
  entranceProductsStocks: EntranceProductStockModel[] = [];
  constructor(private _translate: TranslateService,
    private _router: Router,
    private _entranceProductStock: EntranceProductStockService,
    private _global: GlobalService) {
      this.getEntranceProductStocks();
    this.columnsName = [
      this._translate.instant('products.product'),
      this._translate.instant('providers.provider'),
      this._translate.instant('entranceProductStock.totalUnits'),
      this._translate.instant('entranceProductStock.totalCost'),
      this._translate.instant('entranceProductStock.buyPrice'),'acciones']
    this.columns = [
      { col: 'product', type: 'object', attribute: 'name' },
      {col: 'provider', type: 'object', attribute: 'name'},
      { col: 'totalUnits', type: 'text' },
      { col: 'totalCost', type: 'price' },
      { col: 'buyPriceUnit', type: 'price'},
      { col: 'acciones', type: 'btn' }
    ];
    this.acciones = [
      { accion: 'EDITAR', nombre: _translate.instant('global.edit'), color: 'primary', icon: 'edit'},
      { accion: 'ELIMINAR', nombre: _translate.instant('global.delete'), color: 'warn', icon: 'delete'}
    ];
  }
  add(){
    this._router.navigate(['page/entrance-product-stock/new']);
  }

  getEntranceProductStocks(filter?: any) {
    const shop: ShopModel = this._global.getShop() as ShopModel;
    if(!shop) {
      this._global.openSnackBar(this._translate.instant('global.msgs.shopSelectedRequired'), 'error');
      this._router.navigate(['/page/home']);
    }
    this._entranceProductStock.getAllByFilter(shop.id as string, filter)
    .subscribe(entranceProductsStocks => {
      this.entranceProductsStocks = entranceProductsStocks.storeList as EntranceProductStockModel[];
     });
  }

  handlerEventPage(event: any) {}

  accionar(event: {accion: string, row: any}) {
    switch(event.accion) {
      case 'EDITAR':
      this.edit(event.row);
      break;
    case 'ELIMINAR':
      this.delete(event.row);
      break;
    }
  }

  edit(row: EntranceProductStockModel) {
    this._router.navigate(['/page/entrance-product-stock/' + row.id ]);
  }

  delete(row: EntranceProductStockModel) {
    this._global.confirmDialog('')
    .then((result) => {
      if(result) {
        this._entranceProductStock.deleteById(row.id as string)
        .subscribe((result) => {
          this._global.openSnackBar(result.descripcion as string, 'success');
          this.getEntranceProductStocks();
        });
      }
    });
  }
}
