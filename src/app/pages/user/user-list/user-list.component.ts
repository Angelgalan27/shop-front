import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserModel } from 'src/app/api-rest';
import { GlobalService } from 'src/app/core/services/global.service';
import { UserService } from 'src/app/core/services/user.service';
import { ColumnsParametroListado, ParametrosAcciones } from 'src/app/theme/components/table/table.component';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  columns!: ColumnsParametroListado[];
  columnsName: string[] = [this._translate.instant('global.name'),
  this._translate.instant('users.email'), this._translate.instant('global.actions')];
  clases: string[] = [];
  acciones!: ParametrosAcciones[];
  users!: UserModel[];
  displayedColumns: string[] = ['name', 'email','acciones'];
  constructor(
    private _user: UserService,
    private _router: Router,
    private _global: GlobalService,
    private _translate: TranslateService) {
    this.getUsers();
    this.columns = [
      { col: 'name', type: 'text' },
      { col: 'email', type: 'text' },
      { col: 'acciones', type: 'btn' }
    ];
    this.acciones = [
      { accion: 'EDITAR', nombre: _translate.instant('global.edit'), color: 'primary', icon: 'edit'},
      { accion: 'ELIMINAR', nombre: _translate.instant('global.delete'), color: 'warn', icon: 'delete'}
    ];
  }

  edit(user: UserModel) {
    this._router.navigate([`page/user/${user.id}`]);
  }

  delete(user: UserModel) {
    this._global.confirmDialog(`¿Está seguro de que quiere eliminar el usuario ${user.name}?`)
    .then(result => {
      if(result) {
        this._user.deleteById(user.id as string)
        .subscribe(result => {
          if (result) {
            this._global.openSnackBar('Se ha eliminado correctamente el usuario', 'Usuario');
            this.getUsers();
          }

        });
      }
    });
  }

  getUsers() {
    this._user.getAllByFilter()
    .subscribe(users => {
      this.users = users.users as UserModel[];
      this.users.forEach(user => {
      });
    });
  }

  add() {
    this._router.navigate(['page/user/new']);
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

  handlePageEvent(event: any) {

  }
}
