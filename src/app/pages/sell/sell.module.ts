import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellRoutingModule } from './sell-routing.module';
import { SellComponent } from './sell/sell.component';
import { SellListComponent } from './sell-list/sell-list.component';


@NgModule({
  declarations: [
    SellComponent,
    SellListComponent
  ],
  imports: [
    CommonModule,
    SellRoutingModule
  ]
})
export class SellModule { }
