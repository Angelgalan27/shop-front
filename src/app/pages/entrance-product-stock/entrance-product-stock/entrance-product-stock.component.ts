import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EntranceProductStockModel, ProductModel, ProviderModel, ShopModel } from 'src/app/api-rest';
import { EntranceProductStockService } from 'src/app/core/services/entrance-product-stock.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { ProductService } from 'src/app/core/services/product.service';
import { SupplierService } from 'src/app/core/services/supplier.service';

@Component({
  selector: 'app-entrance-product-stock',
  templateUrl: './entrance-product-stock.component.html',
  styleUrls: ['./entrance-product-stock.component.scss']
})
export class EntranceProductStockComponent {

  form!: FormGroup;
  products!: ProductModel[];
  entranceProductStock: EntranceProductStockModel = {};
  providers!: ProviderModel[];
  constructor(private _fb: FormBuilder,
    private _product: ProductService,
    private _global: GlobalService,
    private _translate: TranslateService,
    private _router: Router,
    private _entranceProductStock: EntranceProductStockService,
    private _provider: SupplierService,
    private _activatedRoute: ActivatedRoute) {
      this.getProviders();
     this.getProducts();
    this.form = this._fb.group({
      product: [{value: '', disabled: false} , {validators: Validators.compose([Validators.required])}],
      provider: [{value: '', disabled: false} , {validators: Validators.compose([Validators.required])}],
      totalUnits: [{value: '', disabled: false} , {validators: Validators.compose([Validators.required])}],
      totalCost: [{value: '', disabled: true} , {validators: Validators.compose([Validators.required])}],
      buyPrice: [{value: '', disabled: false} ,{validators:Validators.compose([Validators.required])}],
      entranceDate: [{value: '', disabled: false} ,{validators:Validators.compose([Validators.required])}],
    });
    this._activatedRoute.paramMap
    .subscribe((param: Params) => {
      const id = param['get']('id');
      if (id && id != 'new') {
        this._entranceProductStock.getById(id)
        .subscribe(entranceProductStock => {
          this.entranceProductStock = entranceProductStock;
          this.loadData();
        })
      } else {
        this.entranceProductStock = {};
      }
    });
   }

   getProducts() {

    const shop: ShopModel = this._global.getShop() as ShopModel;
    if(!shop) {
      this._global.openSnackBar(this._translate.instant('global.msgs.shopSelectedRequired'), 'error');
      this._router.navigate(['/page/home']);
    }
    this._product.getAllByFilter(shop.id as string)
    .subscribe(products => {
      this.products = products.products as ProductModel[];
    });
   }
  save() {
    this.mapValues();
    if(this.entranceProductStock.id) {
      this._entranceProductStock.update(this.entranceProductStock)
      .subscribe(entranceProductStock => {
        this._global.openSnackBar('Se ha actualizado correctamente', 'Entrada stock producto');
        this.back();
      });
    } else {
      this._entranceProductStock.save(this.entranceProductStock)
      .subscribe(entranceProductStock => {
        this._global.openSnackBar('Se ha creado correctamente', 'Entrada stock producto');
        this.back();
      });
    }
  }

  mapValues() {
    const values = this.form.getRawValue();
    const product = this.products.find(p => p.id === values.product);
    this.entranceProductStock.product = product;
    this.entranceProductStock.totalUnits = values.totalUnits;
    this.entranceProductStock.totalCost = values.totalCost;
    this.entranceProductStock.buyPriceUnit = values.buyPrice;
    this.entranceProductStock.entranceDate = values.entranceDate;
    this.entranceProductStock.shop = this._global.getShop() as ShopModel;
    this.entranceProductStock.provider = this.providers.find(p => p.id === values.provider);
  }

  loadData() {
  this.form.patchValue({
    product: this.entranceProductStock.product?.id,
    provider: this.entranceProductStock.provider?.id,
    totalUnits: this.entranceProductStock.totalUnits,
    totalCost: this.entranceProductStock.totalCost,
    buyPrice: this.entranceProductStock.buyPriceUnit,
    entranceDate: this.entranceProductStock.entranceDate,
  })
  }

  back(){
    this._router.navigate(['page/entrance-product-stock/list']);
  }

  getProviders() {
    this._provider.getAllByFilter(this._global.getShop()?.id as string)
    .subscribe(providers => {
      this.providers = providers.providerList as ProviderModel[];
    });
  }

  updateTotalCost() {
    const values = this.form.getRawValue();
    const totalCost = values.totalUnits * values.buyPrice;
    this.form.patchValue({
      totalCost: totalCost
    });
  }
}
