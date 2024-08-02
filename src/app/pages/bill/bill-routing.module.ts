import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillListComponent } from './bill-list/bill-list.component';
import { BillComponent } from './bill/bill.component';

const routes: Routes = [
  {
    path: 'list',
    component: BillListComponent
  },
  {
    path: ':id',
    component: BillComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillRoutingModule { }
