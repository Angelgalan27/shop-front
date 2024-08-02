import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntranceProductStockRoutingModule } from './entrance-product-stock-routing.module';
import { EntranceProductStockComponent } from './entrance-product-stock/entrance-product-stock.component';
import { EntranceProductStockListComponent } from './entrance-product-stock-list/entrance-product-stock-list.component';
import { ThemeModule } from 'src/app/theme/theme.module';
import { FilterEntranceProductStockComponent } from './components/filter-entrance-product-stock/filter-entrance-product-stock.component';


@NgModule({
  declarations: [
    EntranceProductStockComponent,
    EntranceProductStockListComponent,
    FilterEntranceProductStockComponent
  ],
  imports: [
    CommonModule,
    EntranceProductStockRoutingModule,
    ThemeModule
  ]
})
export class EntranceProductStockModule { }
