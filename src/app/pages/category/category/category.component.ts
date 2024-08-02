import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CategoryComboModel, CategoryModel, ShopModel } from 'src/app/api-rest';
import { CategoryService } from 'src/app/core/services/category.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { RolService } from 'src/app/core/services/rol.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent{

  form!: FormGroup;
  showForm: boolean = false;
  category!: CategoryModel;
  //categories!: CategoryModel[];
  categories!: CategoryComboModel[];
  constructor(private _category: CategoryService,
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _global: GlobalService,
    private _router: Router,
    private _rol: RolService,
    private _translate: TranslateService) {
      this.form = this._fb.group({
        name: [{value: '', disabled: false} , {validators: Validators.compose([Validators.required])}],
        description: [{value: '', disabled: false} ,{validators:Validators.compose([Validators.required])}],
        parentCategory: [{value: null, disabled: false}],
        isParent: [{value: null, disabled: false}]
      });
      this.getCategories();
      this._activatedRoute.paramMap
    .subscribe((param: Params) => {
      const id = param['get']('id');
      if (id && id != 'new') {
        this._category.getById(id)
        .subscribe(category => {
          this.category = category;
          this.loadData();
        })
      } else {
        this.category = {};
        this.showForm = true;
      }
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }
    this.mapValue();

    if (this.category.id) {
      this._category.update(this.category)
      .subscribe(category => {
        this.category = category;
        this._global.openSnackBar('Se ha actualizado correctamente', 'Categoria');
        this.back();
      });
    } else {
      this._category.save(this.category)
      .subscribe(category => {
        this.category = category;
        this._global.openSnackBar('Se ha creado correctamente', 'Categoria');
        this.back();
      });

    }
  }



  back() {
    this._router.navigate(['page/category/list']);
  }

  mapValue() {
    const shop: ShopModel = this._global.getShop() as ShopModel;
    if (!shop) {
      this._global.openSnackBar(this._translate.instant('global.msgs.shopSelectedRequired'), 'error');
      return;
    }
    let parentCategory = {};
    if (this.form.controls['parentCategory'].value != '' && this.form.controls['parentCategory'].value != null) {
      parentCategory = this.categories.find(category => category.id === this.form.controls['parentCategory'].value) as CategoryModel;

    }
    this.category.name = this.form.controls['name'].value;
    this.category.description = this.form.controls['description'].value
    this.category.parent = this.form.controls['isParent'].value
    this.category.categoryParent = parentCategory;
    this.category.shop = shop;
  }

  loadData() {
    this.form.controls['name'].setValue(this.category.name);
    this.form.controls['description'].setValue(this.category.description);
    this.form.controls['isParent'].setValue(this.category.parent);
    this.form.controls['parentCategory'].setValue(this.category.categoryParent != null ? this.category.categoryParent.id : null);
    this.showForm = true;
  }

  private getCategories() {
    const shop: ShopModel = this._global.getShop() as ShopModel;
    if (!shop) {
      this._global.openSnackBar(this._translate.instant('global.msgs.shopSelectedRequired'), 'error');
      this._router.navigate(['/page/home']);
    }
    this._category.getAllParent(shop.id as string)
    .subscribe(categories => {
      this.categories = categories;
    });
  }

}
