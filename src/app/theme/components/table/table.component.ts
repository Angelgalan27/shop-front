import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';

export interface ParametrosAcciones {
  nombre: string;
  color: '' | 'primary' | 'warn';
  accion: string;
  condicion?: (row: any) => boolean;
  icon?: string;
}

export interface ColumnsParametroListado {
  col: string,
  type: 'text' | 'date' | 'boolean' | 'btn' | 'select' | 'price' | 'object' | 'image',
  attribute?: string
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() columns!: ColumnsParametroListado[];
  @Input() columnsName!: string[] ;
  @Input() clases: string[] = [];
  @Input() acciones!: ParametrosAcciones[];
  @Input() displayedColumns!: string[];
  @Input() datos!: any[];
  @Input() showPagination: boolean = true;
  @Input() totalResult!: number;
  @Input() page!: number;
  @Output() eventEmmiter: EventEmitter<{accion: string, row: any}> = new EventEmitter();
  @Output() eventHandlerPage: EventEmitter<any> = new EventEmitter();
  constructor() {

  }


  accionar(accion: string, row: any) {
    this.eventEmmiter.emit({accion, row});
  }

  handlePageEvent(event: any) {
    this.eventHandlerPage.emit(event);
  }
}
