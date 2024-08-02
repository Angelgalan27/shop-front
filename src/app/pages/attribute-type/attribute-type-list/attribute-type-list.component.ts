import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AttributeTypeService } from 'src/app/core/services/attribute-type.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { ColumnsParametroListado, ParametrosAcciones } from 'src/app/theme/components/table/table.component';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddAttributeTypeComponent } from '../components/modal-add-attribute-type/modal-add-attribute-type.component';
import { AttributeTypeModel, ShopModel } from 'src/app/api-rest';
@Component({
  selector: 'app-attribute-type-list',
  templateUrl: './attribute-type-list.component.html',
  styleUrls: ['./attribute-type-list.component.scss']
})
export class AttributeTypeListComponent {

  columns!: ColumnsParametroListado[];
  columnsName: string[] = [this._translate.instant('global.name'),
  this._translate.instant('global.description'), this._translate.instant('global.actions')];
  clases: string[] = [];
  acciones!: ParametrosAcciones[];
  attributesTypes!: AttributeTypeModel[];
  displayedColumns: string[] = ['name', 'description','acciones'];

  constructor(  private _router: Router,
    private _global: GlobalService,
    private _translate: TranslateService,
    private _attributeType: AttributeTypeService,
    private _dialog: MatDialog) {
    this.getAttributesTypes();
    this.columns = [
      { col: 'name', type: 'text' },
      { col: 'description', type: 'text' },
      { col: 'acciones', type: 'btn' }
    ];
    this.acciones = [
      { accion: 'EDITAR', nombre: _translate.instant('global.edit'), color: 'primary', icon: 'edit'},
      { accion: 'ELIMINAR', nombre: _translate.instant('global.delete'), color: 'warn', icon: 'delete'}
    ];
  }

  add(attributeType?: AttributeTypeModel) {
    const dialogRef = this._dialog.open( ModalAddAttributeTypeComponent, {
      width: '900px',
      maxWidth: '95%',
      data: {
        attributeType: attributeType ? attributeType : null
      }
    });
    dialogRef.afterClosed().subscribe((result: AttributeTypeModel) => {
      if (result) {
        this.getAttributesTypes();
      }
    });
  }

  delete(attributeType: AttributeTypeModel) {
    this._global.confirmDialog(`¿Está seguro de que quiere eliminar el tipo de atributo ${attributeType.name}?`)
    .then(result => {
      if(result) {
        this._attributeType.deleteById(attributeType.id as string)
        .subscribe(result => {
          if (result) {
            this._global.openSnackBar('Se ha eliminado correctamente el tipo de atributo', 'Tipo de atributo');
            this.getAttributesTypes();
          }
        });
      }
    });
  }

  accionar(event: {accion: string, row: any}) {
    switch(event.accion) {
      case 'EDITAR' :
        this.add(event.row);
        break;
      case 'ELIMINAR':
        this.delete(event.row);
        break;
    }
  }

  getAttributesTypes() {
    const shop: ShopModel = this._global.getShop();
    if (!shop) {
      this._global.openSnackBar('shopSelectedRequired', 'error');
      return;
    }
    this._attributeType.getAll(shop.id as string)
    .pipe(take(1))
    .subscribe(attributesTypes => this.attributesTypes = attributesTypes);
  }
}
