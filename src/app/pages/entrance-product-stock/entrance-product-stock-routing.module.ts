import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntranceProductStockListComponent } from './entrance-product-stock-list/entrance-product-stock-list.component';
import { EntranceProductStockComponent } from './entrance-product-stock/entrance-product-stock.component';

const routes: Routes = [
  {
    path: 'list',
    component: EntranceProductStockListComponent
  },
  {
    path: ':id',
    component:EntranceProductStockComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntranceProductStockRoutingModule { }
