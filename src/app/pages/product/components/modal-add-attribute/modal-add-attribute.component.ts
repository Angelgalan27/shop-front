import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { AttributeModel, AttributeTypeModel, ProductModel, ShopModel } from 'src/app/api-rest';
import { AttributeTypeService } from 'src/app/core/services/attribute-type.service';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
  selector: 'app-modal-add-attribute',
  templateUrl: './modal-add-attribute.component.html',
  styleUrls: ['./modal-add-attribute.component.scss']
})
export class ModalAddAttributeComponent {


  form!: FormGroup;
  attribute!: AttributeModel;
  attributesTypes!: AttributeTypeModel[];
  constructor(private _dialogRef: MatDialogRef<ModalAddAttributeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _attributesTypes: AttributeTypeService,
    private _fb: FormBuilder,
    private _global: GlobalService) {
      this.getAtributesTypes();
      this.form = this._fb.group({
        attributeType: [{value: '', disabled: false} , {validators: Validators.compose([Validators.required])}],
        description: [{value: '', disabled: false} ,{validators:Validators.compose([Validators.required])}]
      });

      if (data.attribute) {
        this.attribute = data.attribute;
        this.loadDataAttribute();
      }
    }

  loadDataAttribute() {
    this.form.controls['attributeType'].setValue(this.attribute.attributeType?.id);
    this.form.controls['description'].setValue(this.attribute.value);
  }

  close() {this._dialogRef.close();}

  add() {
    const attributeType: AttributeTypeModel = this.attributesTypes.find(attr => attr.id === this.form.controls['attributeType'].value) as AttributeTypeModel;
      this._dialogRef.close({
        attributeType: attributeType,
        value: this.form.controls['description'].value
      });
  }

  getAtributesTypes() {
    const shop: ShopModel = this._global.getShop();
    if (!shop) {
      this._global.openSnackBar('shopSelectedRequired', 'error');
      return;
    }
    this._attributesTypes.getAll(shop.id as string)
    .pipe(take(1))
    .subscribe(attributesTypes => this.attributesTypes = attributesTypes);
  }
}
