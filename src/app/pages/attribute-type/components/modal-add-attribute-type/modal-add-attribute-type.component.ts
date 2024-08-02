import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AttributeTypeService } from 'src/app/core/services/attribute-type.service';
import { take } from 'rxjs/operators';
import { AttributeTypeModel, ShopModel } from 'src/app/api-rest';
import { GlobalService } from 'src/app/core/services/global.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-modal-add-attribute-type',
  templateUrl: './modal-add-attribute-type.component.html',
  styleUrls: ['./modal-add-attribute-type.component.scss']
})
export class ModalAddAttributeTypeComponent {

  form!: FormGroup;
  attributeType!: AttributeTypeModel;
  constructor(
    private _dialogRef: MatDialogRef<ModalAddAttributeTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private _attributeType: AttributeTypeService,
    private _global: GlobalService,
    private _translate: TranslateService) {
    this.form = this._fb.group({
      name: [{value: '', disabled: false} , {validators: Validators.compose([Validators.required])}],
      description: [{value: '', disabled: false} ,{validators:Validators.compose([Validators.required])}]
        });
    if (this.data.attributeType && this.data.attributeType && this.data.attributeType != null) {
      this.attributeType = this.data.attributeType;
      this.loadData();
    } else {
      this.attributeType = {};
    }
  }

  close() { this._dialogRef.close(); }

  save() {
    if (this.form.invalid) {
      return;
    }

    this.mapValue();
    if (this.attributeType.id) {
      this._attributeType.update(this.attributeType)
      .pipe(take(1))
      .subscribe(attributeType => this._dialogRef.close(attributeType));
    } else {
      this._attributeType.save(this.attributeType)
      .pipe(take(1))
      .subscribe(attributeType => this._dialogRef.close(attributeType));
    }
  }

  mapValue(){
    const shop: ShopModel = this._global.getShop() as ShopModel;
    if (!shop) {
      this._global.openSnackBar(this._translate.instant('global.msgs.shopSelectedRequired'), 'error');
      return;
    }
    this.attributeType.name = this.form.controls['name'].value;
    this.attributeType.description = this.form.controls['description'].value;
    this.attributeType.shop = shop;
  }

  loadData() {
    this.form.controls['name'].setValue(this.attributeType.name);
    this.form.controls['description'].setValue(this.attributeType.description);
  }
}
