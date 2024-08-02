import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolComponent } from './rol/rol.component';
import { RolListComponent } from './rol-list/rol-list.component';

const routes: Routes = [
  {
    path: 'list',
    component:RolListComponent
  },
  {
    path: ':id',
    component: RolComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolRoutingModule { }
