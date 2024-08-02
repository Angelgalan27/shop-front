import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs';
import { CategoryComboModel, CategoryModel, ProductModel, ShopModel } from 'src/app/api-rest';
import { CategoryService } from 'src/app/core/services/category.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { ProductService } from 'src/app/core/services/product.service';
import tinymce from 'tinymce';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @ViewChild('inputHideUpload') inputHideUpload: any;
  form: FormGroup;
  showForm: boolean = true;
  categories!: CategoryModel[];
  comboCategories!: CategoryComboModel[];
  product!: ProductModel;
  files: File[] = [];
  loadingImages: boolean = false;
  constructor(private _fb: FormBuilder,
    private _category: CategoryService,
    private _activatedRoute: ActivatedRoute,
    private _product: ProductService,
    private _global: GlobalService,
    private _router: Router,
    private _translate: TranslateService) {
    this.form = this._fb.group({
      stock: [{value: '', disabled: true}],
      price: [{value: '', disabled: false} , {validators: Validators.compose([Validators.required])}],
      code: [{value: '', disabled: false} , {validators: Validators.compose([Validators.required])}],
      name: [{value: '', disabled: false} , {validators: Validators.compose([Validators.required])}],
      description: [{value: '', disabled: false} ,{validators:Validators.compose([Validators.required])}],
      characteristics: [{value: '', disabled: false}],
      specifications: [{value: '', disabled: false}],
      category: [{value: null, disabled: false} ,{validators:Validators.compose([Validators.required])}],
      file: [{value: null, disabled: false}]
    });
    this.getComboCategory();
    this.getCategories();
    this._activatedRoute.paramMap
    .subscribe((param: Params) => {
      const id = param['get']('id');
      if (id && id != 'new') {
        this._product.getById(id)
        .subscribe(product => {
          this.product = product;
          this.loadData();
        })
      } else {
        this.product = {};
        this.showForm = true;
      }
    });
    tinymce.init({
      selector: 'textarea#default-editor',
      height: 500,
      menubar: false,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
      ],
      toolbar: 'undo redo | formatselect | ' +
      'bold italic backcolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat | help',
      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
    });
  }



  save() {
    if (this.form.invalid) {
      return;
    }

    this.mapValue();
    if (this.product.id) {
      this._product.update(this.product)
      .pipe(take(1))
      .subscribe(() => {
        this._global.openSnackBar('Se ha actualizado correctamente', 'Producto');
        this.back();
      });
    } else {
      this._product.save(this.product)
      .pipe(take(1))
      .subscribe(() => {
        this._global.openSnackBar('Se ha creado correctamente', 'Producto');
        this.back();
      });
    }
  }

  back() {
    this._router.navigate(['page/product/list']);
  }

  private getCategories() {
    const shop: ShopModel = this._global.getShop() as ShopModel;
    if (!shop) {
      this._global.openSnackBar(this._translate.instant('global.msgs.shopSelectedRequired'), 'error');
      this._router.navigate(['/page/home']);
    }
    this._category.getAllByFilter(shop.id as string)
    .subscribe(categories => {
      this.categories = categories.categories as CategoryModel[];
    });
  }

  mapValue() {
    const shop: ShopModel = this._global.getShop();
    if (!shop) {
      this._global.openSnackBar('shopSelectedRequired', 'error');
      return;
    }
    let category = {};
    if (this.form.controls['category'].value != '' || this.form.controls['category'].value != null) {
      category = this.categories.find(category => category.id === this.form.controls['category'].value) as CategoryModel;

    }
    this.product.code = this.form.controls['code'].value;
    this.product.name = this.form.controls['name'].value;
    this.product.description = this.form.controls['description'].value
    this.product.category = category;
    this.product.shop = shop;
    this.product.price = Number(this.form.controls['price'].value);
    this.product.characteristics = this.form.controls['characteristics'].value;
    this.product.specifications = this.form.controls['specifications'].value;
  }

  loadData() {
    this.form.controls['code'].setValue(this.product.code);
    this.form.controls['name'].setValue(this.product.name);
    this.form.controls['description'].setValue(this.product.description);
    this.form.controls['category'].setValue(this.product.category != null ? this.product.category.id : null);
    this.form.controls['price'].setValue(this.product.price);
    this.form.controls['stock'].setValue(this.product.stock);
    this.form.controls['characteristics'].setValue(this.product.characteristics);
    this.form.controls['specifications'].setValue(this.product.specifications);
    this.showForm = true;
  }

  addImages() {
    this.inputHideUpload.nativeElement.click();
  }

  uploadFiles(event: any) {
    this.loadingImages = true;
    this.files = Array.from(event.target.files);
    this._product.uploadFiles(this.product.id as string, this.files)
    .subscribe((res) => {
      this._global.openSnackBar(res.descripcion as string , 'Producto');
      this._product.getById(this.product.id as string)
        .subscribe(product => {
          this.product.files = product.files;
          this.loadingImages = false;
        })
    });
  }
  getComboCategory() {
    const shop: ShopModel = this._global.getShop();
    if (!shop) {
      this._global.openSnackBar('shopSelectedRequired', 'error');
      return;
    }
    this._category.getAllCombo(shop.id as string)
    .subscribe(categories => this.comboCategories = categories);
  }
}
