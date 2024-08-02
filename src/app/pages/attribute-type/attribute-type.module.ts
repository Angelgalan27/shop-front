import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttributeTypeRoutingModule } from './attribute-type-routing.module';
import { AttributeTypeListComponent } from './attribute-type-list/attribute-type-list.component';
import { ModalAddAttributeTypeComponent } from './components/modal-add-attribute-type/modal-add-attribute-type.component';
import { ThemeModule } from 'src/app/theme/theme.module';


@NgModule({
  declarations: [
    AttributeTypeListComponent,
    ModalAddAttributeTypeComponent
  ],
  imports: [
    CommonModule,
    AttributeTypeRoutingModule,
    ThemeModule
  ],
  entryComponents: [ModalAddAttributeTypeComponent]
})
export class AttributeTypeModule { }
