import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopListComponent } from './shop-list/shop-list.component';
import { ShopComponent } from './shop/shop.component';
import { ThemeModule } from 'src/app/theme/theme.module';


@NgModule({
  declarations: [
    ShopListComponent,
    ShopComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    ThemeModule
  ]
})
export class ShopModule { }
