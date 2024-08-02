import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolRoutingModule } from './rol-routing.module';
import { RolComponent } from './rol/rol.component';
import { RolListComponent } from './rol-list/rol-list.component';
import { ThemeModule } from 'src/app/theme/theme.module';


@NgModule({
  declarations: [
    RolComponent,
    RolListComponent
  ],
  imports: [
    CommonModule,
    RolRoutingModule,
    ThemeModule
  ]
})
export class RolModule { }
