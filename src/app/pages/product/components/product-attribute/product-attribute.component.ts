import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from 'src/app/core/services/global.service';
import { ColumnsParametroListado, ParametrosAcciones } from 'src/app/theme/components/table/table.component';
import { ModalAddAttributeComponent } from '../modal-add-attribute/modal-add-attribute.component';
import { AttributeModel, ProductModel } from 'src/app/api-rest';

@Component({
  selector: 'app-product-attribute',
  templateUrl: './product-attribute.component.html',
  styleUrls: ['./product-attribute.component.scss']
})
export class ProductAttributeComponent implements OnInit{

  @Input() product!: ProductModel;
  columns!: ColumnsParametroListado[];
  columnsName: string[] = [this._translate.instant('global.name'),
  this._translate.instant('global.value'), this._translate.instant('global.actions')];
  clases: string[] = [];
  acciones!: ParametrosAcciones[];
  displayedColumns: string[] = [ 'attributeName','value','acciones'];
  attributes: {attributeName: string | undefined, value: string | undefined, id?: string}[] = [];
  constructor(private _translate: TranslateService,
    private _global: GlobalService,
    private _dialog: MatDialog) {
      this.columns = [
        { col: 'attributeName', type: 'text' },
        { col: 'value', type: 'text' },
        { col: 'acciones', type: 'btn' }
      ];
      this.acciones = [
        { accion: 'EDITAR', nombre: _translate.instant('global.edit'), color: 'primary', icon: 'edit'},
        { accion: 'ELIMINAR', nombre: _translate.instant('global.delete'), color: 'warn', icon: 'delete'}
      ];

    }
  ngOnInit(): void {
      this.loadAttributes();
  }

  loadAttributes() {
    this.attributes = [];
    this.product.attributes?.forEach(attr => this.attributes
      .push({attributeName: attr.attributeType?.name, value: attr.value, id: attr.id}));
  }

  edit(attribute: AttributeModel) {
    this.add(attribute);
  }

  delete(attribute: AttributeModel) {
    this._global.confirmDialog(`¿Está seguro de que quiere eliminar el atributo ${attribute.attributeType?.name}?`)
    .then(result => {
      if(result) {
        this.product.attributes?.splice(this.product.attributes.indexOf(attribute), 1);
        this.loadAttributes();
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

  add(attribute?: AttributeModel) {
    const dialogRef = this._dialog.open( ModalAddAttributeComponent, {
      width: '900px',
      maxWidth: '95%',
      data: {
        attribute: attribute ? attribute : null
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.product.attributes?.push(result);
        this.loadAttributes();
      }
    });
  }
}
