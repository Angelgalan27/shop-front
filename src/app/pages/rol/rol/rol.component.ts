import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ActionModel, RolModel } from 'src/app/api-rest';
import { ActionService } from 'src/app/core/services/action.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { RolService } from 'src/app/core/services/rol.service';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.scss']
})
export class RolComponent {

  form!: FormGroup;
  showForm: boolean = false;
  rol!: RolModel;
  actions!: ActionModel[];
  constructor(private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _global: GlobalService,
    private _router: Router,
    private _rol: RolService,
    private _action: ActionService) {
      this.form = this._fb.group({
        name: [{value: '', disabled: false} , {validators: Validators.compose([Validators.required])}],
        description: [{value: '', disabled: false} ,{validators:Validators.compose([Validators.required])}],
        actions: [{value: '', disabled: false}]
      });
      this._activatedRoute.paramMap
    .subscribe((param: Params) => {
      const id = param['get']('id');
      if (id && id != 'new') {
        this._rol.getById(id)
        .subscribe(rol => {
          this.rol = rol;
          this.loadData();
        })
      } else {
        this.rol = {};
        this.showForm = true;
      }
    });
    this.getActions();
    }

  save() {
    if (this.form.invalid) {
      return;
    }
    this.mapValue();

    if (this.rol.id) {
      this._rol.update(this.rol)
      .subscribe(rol => {
        this.rol = rol;
        this._global.openSnackBar('Se ha actualizado correctamente', 'Rol');
        this.back();
      });
    } else {
      this._rol.save(this.rol)
      .subscribe(rol => {
        this.rol = rol;
        this._global.openSnackBar('Se ha creado correctamente', 'Rol');
        this.back();
      });

    }
  }

  back(){
    this._router.navigate(['page/rol/list']);
  }

  loadData() {
    this.form.controls['name'].setValue(this.rol.name);
    this.form.controls['description'].setValue(this.rol.description);
    this.form.controls['actions'].setValue(this.rol.actions?.map(action => action.id));
    this.showForm = true;
  }

  mapValue() {
    const actions: ActionModel[] = [];
    (this.form.controls['actions'].value as string[]).forEach(actionId => {
      const action: ActionModel = this.actions.find(action => action.id === actionId) as ActionModel;
      actions.push(action);
    });
    this.rol.name = this.form.controls['name'].value;
    this.rol.description = this.form.controls['description'].value
    this.rol.actions = actions;
  }

  getActions() {
    this._action.getAll()
    .subscribe(actions => this.actions = actions);
  }
}
