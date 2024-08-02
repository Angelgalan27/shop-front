import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from 'src/app/core/services/global.service';
import { SupplierService } from 'src/app/core/services/supplier.service';
import { ColumnsParametroListado, ParametrosAcciones } from 'src/app/theme/components/table/table.component';
import { take } from 'rxjs/operators';
import { ProviderModel, ShopModel } from 'src/app/api-rest';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent {

  columns!: ColumnsParametroListado[];
  columnsName: string[] = [
  this._translate.instant('providers.cif'),
  this._translate.instant('global.name'),
  this._translate.instant('global.email'),
  this._translate.instant('providers.phone'),
  this._translate.instant('global.actions')];
  clases: string[] = [];
  acciones!: ParametrosAcciones[];
  suppliers!: ProviderModel[];
  displayedColumns: string[] = ['cif','name', 'email','phone','acciones'];
  constructor(private _router: Router,
    private _translate: TranslateService,
    private _global: GlobalService,
    private _suplier: SupplierService) {
      this.getSuppliers();
      this.columns = [
        { col: 'cif', type: 'text' },
        { col: 'name', type: 'text' },
        { col: 'email', type: 'text' },
        { col: 'phone', type: 'text' },
        { col: 'acciones', type: 'btn' }
      ];
      this.acciones = [
        { accion: 'EDITAR', nombre: _translate.instant('global.edit'), color: 'primary', icon: 'edit'},
        { accion: 'ELIMINAR', nombre: _translate.instant('global.delete'), color: 'warn', icon: 'delete'}
      ];
  }

  edit(provider: ProviderModel) {
    this._router.navigate([`page/supplier/${provider.id}`]);
  }

  delete(provider: ProviderModel) {
    this._global.confirmDialog(`¿Está seguro de que quiere eliminar el proveedor ${provider.name}?`)
    .then(result => {
      if(result) {
        this._suplier.deleteById(provider.id as string)
        .subscribe(result => {
          if (result) {
            this._global.openSnackBar('Se ha eliminado correctamente el usuario', 'Proveedor');
            this.getSuppliers();
          }

        });
      }
    });
  }
  add() {
    this._router.navigate(['page/supplier/new']);
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

  private getSuppliers() {
    const shop: ShopModel = this._global.getShop() as ShopModel;
    if(!shop) {
      this._global.openSnackBar(this._translate.instant('global.msgs.shopSelectedRequired'), 'error');
      this._router.navigate(['/page/home']);
    }
    this._suplier.getAllByFilter(shop.id as string)
    .pipe(take(1))
    .subscribe(supliers => this.suppliers = supliers.providerList as ProviderModel[]);
  }
}
