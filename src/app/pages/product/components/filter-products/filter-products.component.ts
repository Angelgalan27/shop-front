import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {  CategoryComboModel, ProductFilter, ShopModel} from 'src/app/api-rest';
import { CategoryService } from 'src/app/core/services/category.service';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
  selector: 'app-filter-products',
  templateUrl: './filter-products.component.html',
  styleUrls: ['./filter-products.component.scss']
})
export class FilterProductsComponent {

  @Output() eventSearch: EventEmitter<ProductFilter> = new EventEmitter();

  form: FormGroup;
  categories!: CategoryComboModel[];
  constructor(private _fb: FormBuilder,
    private _category: CategoryService,
    private _global: GlobalService) {
      this.getComboCategory();
    this.form = this._fb.group({
      name: [{value: null, disabled: false}],
      code: [{value: null, disabled: false}],
      category: [{value: null, disabled: false}],
      description: [{value: null, disabled: false}],
    });
  }

  search() {
    const filter: ProductFilter = {
      name: this.form.controls['name'].value,
      code: this.form.controls['code'].value,
      categoryId: this.form.controls['category'].value,
      description: this.form.controls['description'].value,
    }
    this.eventSearch.emit(filter);
  }

  clear() {
    this.form.controls['name'].setValue(null);
    this.form.controls['description'].setValue(null);
    this.form.controls['code'].setValue(null);
    this.form.controls['category'].setValue(null);
    this.search();
  }

  getComboCategory() {
    const shop: ShopModel = this._global.getShop();
    if (!shop) {
      this._global.openSnackBar('shopSelectedRequired', 'error');
      return;
    }
    this._category.getAllCombo(shop.id as string)
    .subscribe(categories => this.categories = categories);
  }
}
