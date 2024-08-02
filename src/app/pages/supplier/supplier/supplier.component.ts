import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProviderModel, ShopModel } from 'src/app/api-rest';
import { GlobalService } from 'src/app/core/services/global.service';
import { SupplierService } from 'src/app/core/services/supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent {
  supplier!: ProviderModel;
  form: FormGroup;
  showForm: boolean = false;

  constructor(private _fb: FormBuilder,
    private _router: Router,
    private _supplier: SupplierService,
    private _global: GlobalService,
    private _activatedRoute: ActivatedRoute,
    private _translate: TranslateService) {
    this.form = this._fb.group({
      cif: [{value: '', disabled: false} , {validators: Validators.compose([Validators.required])}],
      name: [{value: '', disabled: false} , {validators: Validators.compose([Validators.required])}],
      email: [{value: '', disabled: false} ,{validators:Validators.compose([Validators.required, Validators.email])}],
      phone: [{value: '', disabled: false}],
    });

    this._activatedRoute.paramMap
    .subscribe((param: Params) => {
      const id = param['get']('id');
      if (id && id != 'new') {
        this._supplier.getById(id)
        .subscribe(supplier => {
          this.supplier = supplier;
          this.loadData();
        })
      } else {
        this.supplier = {};
        this.showForm = true;
      }
    });
  }

  save(){
    const shop: ShopModel = this._global.getShop() as ShopModel;
    if(!shop) {
      this._global.openSnackBar(this._translate.instant('global.msgs.shopSelectedRequired'), 'error');
      this._router.navigate(['/page/home']);
    }
    if (this.form.invalid) {
      return;
    }
    this.mapValue();
    this.supplier.shop = shop;
    if (this.supplier.id) {
      this._supplier.update(this.supplier)
      .subscribe(supplier => {
        this.supplier = supplier;
        this._global.openSnackBar('Se ha actualizado correctamente', 'Proveedor');
        this.back();
      });
    } else {
      this._supplier.save(this.supplier)
      .subscribe(supplier => {
        this.supplier = supplier;
        this._global.openSnackBar('Se ha creado correctamente', 'Proveedor');
        this.back();
      });

    }
  }

  back() {
    this._router.navigate(['page/supplier/list']);
  }

  mapValue() {
    this.supplier.cif = this.form.controls['cif'].value;
    this.supplier.name = this.form.controls['name'].value;
    this.supplier.email = this.form.controls['email'].value;
    this.supplier.phone = this.form.controls['phone'].value;
  }

  loadData() {
    this.form.controls['cif'].setValue(this.supplier.cif)
    this.form.controls['name'].setValue(this.supplier.name);
    this.form.controls['email'].setValue(this.supplier.email);
    this.form.controls['phone'].setValue(this.supplier.phone);
    this.showForm = true;
  }
}
