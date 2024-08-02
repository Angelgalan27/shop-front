import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ThemeModule } from 'src/app/theme/theme.module';
import { ProductAttributeComponent } from './components/product-attribute/product-attribute.component';
import { ModalAddAttributeComponent } from './components/modal-add-attribute/modal-add-attribute.component';
import { FilterProductsComponent } from './components/filter-products/filter-products.component';
import { ProductImagesComponent } from './components/product-images/product-images.component';


@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductAttributeComponent,
    ModalAddAttributeComponent,
    FilterProductsComponent,
    ProductImagesComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ThemeModule
  ],
  entryComponents: [ModalAddAttributeComponent]
})
export class ProductModule { }
