import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RolModel } from 'src/app/api-rest';
import { GlobalService } from 'src/app/core/services/global.service';
import { RolService } from 'src/app/core/services/rol.service';
import { ColumnsParametroListado, ParametrosAcciones } from 'src/app/theme/components/table/table.component';

@Component({
  selector: 'app-rol-list',
  templateUrl: './rol-list.component.html',
  styleUrls: ['./rol-list.component.scss']
})
export class RolListComponent {

  roles!: RolModel[];
  columns!: ColumnsParametroListado[];
  columnsName: string[] = [this._translate.instant('global.name'),
   this._translate.instant('global.description'), this._translate.instant('global.actions')];
  clases: string[] = [];
  acciones!: ParametrosAcciones[];
  displayedColumns: string[] = ['name', 'description','acciones'];

  constructor(private _rol: RolService,
    private _router: Router,
    private _global: GlobalService,
    private _translate: TranslateService) {
    this.getRoles();
    this.columns = [
      { col: 'name', type: 'text'},
      { col: 'description', type: 'text'},
      { col: 'acciones', type: 'btn'}];
    this.acciones = [
      { accion: 'EDITAR', nombre: this._translate.instant('global.edit'), color: 'primary', icon: 'edit' },
      { accion: 'ELIMINAR', nombre: this._translate.instant('global.delete'), color: 'warn', icon: 'delete'}
    ];
  }

  edit(rol: RolModel) {
    this._router.navigate([`page/rol/${rol.id}`]);
  }

  delete(rol: RolModel) {
    this._global.confirmDialog(`¿Está seguro de que quiere eliminar el rol ${rol.name}?`)
    .then(result => {
      if(result) {
        this._rol.deleteById(rol.id as string)
        .subscribe(result => {
          if (result) {
            this._global.openSnackBar('Se ha eliminado correctamente el rol', 'Rol');
            this.getRoles();
          }
        });
      }
    });
  }

  accionar(event: {accion: string, row: any}) {
    switch(event.accion) {
      case 'EDITAR' :
        this.edit(event.row);
        break;
      case 'ELIMINAR':
        this.delete(event.row);
        break;
    }
  }

  add() {
    this._router.navigate(['page/rol/new']);
  }

  private getRoles() {
    this._rol.getAll()
    .subscribe(roles => this.roles = roles);
  }
}
