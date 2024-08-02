import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './layout/menu/menu.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HeaderComponent } from './layout/header/header.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { TableComponent } from './components/table/table.component';
import { TranslateModule } from '@ngx-translate/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MenuBottomMobileComponent } from './components/menu-bottom-mobile/menu-bottom-mobile.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';

const MODULES= [
  MatSidenavModule,
  MatCardModule,
  MatIconModule,
  MatMenuModule,
  MatButtonModule,
  MatInputModule,
  MatDividerModule,
  FormsModule,
  ReactiveFormsModule,
  MatSnackBarModule,
  MatTableModule,
  MatTooltipModule,
  MatDialogModule,
  MatSelectModule,
  TranslateModule,
  MatPaginatorModule,
  MatSlideToggleModule,
  MatDatepickerModule,
  MatNativeDateModule,
  EditorModule,
  MatBottomSheetModule,
  MatListModule
];

const COMPONENTS = [
  MenuComponent,
  MainLayoutComponent,
  ConfirmDialogComponent,
  TableComponent
]


@NgModule({
  declarations: [
    ...COMPONENTS,
    HeaderComponent,
    MenuBottomMobileComponent
  ],
  imports: [
    ...MODULES,
    CommonModule,
    RouterModule
  ],
  exports: [...MODULES, ...COMPONENTS],
  entryComponents: [ConfirmDialogComponent]
})
export class ThemeModule { }
