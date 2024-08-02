import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillRoutingModule } from './bill-routing.module';
import { BillComponent } from './bill/bill.component';
import { BillListComponent } from './bill-list/bill-list.component';


@NgModule({
  declarations: [
    BillComponent,
    BillListComponent
  ],
  imports: [
    CommonModule,
    BillRoutingModule
  ]
})
export class BillModule { }
