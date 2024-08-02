import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttributeTypeListComponent } from './attribute-type-list/attribute-type-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: AttributeTypeListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttributeTypeRoutingModule { }
