import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellListComponent } from './sell-list/sell-list.component';
import { SellComponent } from './sell/sell.component';

const routes: Routes = [
  {
    path: 'list',
    component: SellListComponent
  },
  {
    path: ':id',
    component: SellComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellRoutingModule { }
