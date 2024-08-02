import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RolModel, ShopModel, UserModel } from 'src/app/api-rest';
import { GlobalService } from 'src/app/core/services/global.service';
import { RolService } from 'src/app/core/services/rol.service';
import { ShopService } from 'src/app/core/services/shop.service';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  user!: UserModel;
  roles!: RolModel[];
  shops!: ShopModel[];
  form: FormGroup;
  showForm: boolean = false;
  constructor( private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _user: UserService,
    private _global: GlobalService,
    private _router: Router,
    private _rol: RolService,
    private _shop: ShopService) {
      this.getShops();
    this.form = this._fb.group({
      name: [{value: '', disabled: false} , {validators: Validators.compose([Validators.required])}],
      email: [{value: '', disabled: false} ,{validators:Validators.compose([Validators.required, Validators.email])}],
      roles: [{value: '', disabled: false} ,{validators:Validators.compose([Validators.required])}],
      shops: [{value: '', disabled: false} ,{validators:Validators.compose([Validators.required])}],
      password: [''],
      repeatPassword: ['']
    });
    this._activatedRoute.paramMap
    .subscribe((param: Params) => {
      const id = param['get']('id');
      if (id && id != 'new') {
        this._user.getById(id)
        .subscribe(user => {
          this.user = user;
          this.loadData();
          this.getRoles();
        })
      } else {
        this.user = {};
        this.showForm = true;
        this.getRoles();
      }
    });

  }

  save() {
    if (this.form.invalid) {
      return;
    }
    this.mapValue();
    if(!this.user.id && (!this.user.password || this.user.password === '')) {
      this._global.openSnackBar('La contraseña es obligatoria', 'ERROR');
      return;
    }

    if (this.user.id) {
      this._user.update(this.user)
      .subscribe(user => {
        this.user = user;
        this._global.openSnackBar('Se ha actualizado correctamente', 'Usuario');
        this.back();
      });
    } else {
      this._user.save(this.user)
      .subscribe(user => {
        this.user = user;
        this._global.openSnackBar('Se ha creado correctamente', 'Usuario');
        this.back();
      });

    }
  }

  back() {
    this._router.navigate(['page/user/list']);
  }

  mapValue() {
    const roles: RolModel[] = [];
    (this.form.controls['roles'].value as string[]).forEach(rolId => {
      const rol: RolModel = this.roles.find(rol => rol.id === rolId) as RolModel;
      roles.push(rol);
    });
    const shops: ShopModel[] = [];
    (this.form.controls['shops'].value as string[]).forEach(shopId => {
      const shop: ShopModel = this.shops.find(shop => shop.id === shopId) as ShopModel;
      shops.push(shop);
    });
    this.user.name = this.form.controls['name'].value;
    this.user.email = this.form.controls['email'].value
    this.user.password = this.form.controls['password'].value;
    this.user.roles = roles;
    this.user.shops = shops;
  }

  loadData() {
    this.form.controls['name'].setValue(this.user.name);
    this.form.controls['email'].setValue(this.user.email);
    this.form.controls['roles'].setValue(this.user.roles?.map(rol => rol.id));
    this.form.controls['shops'].setValue(this.user.shops?.map(shop => shop.id));
    this.showForm = true;

  }

  getRoles() {
    this._rol.getAll()
    .subscribe(roles => this.roles = roles);
  }

  getShops() {
    this._shop.getAll()
    .subscribe(shops => this.shops = shops);
  }
}
