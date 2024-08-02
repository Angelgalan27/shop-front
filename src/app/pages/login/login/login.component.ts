import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateRequestModel } from 'src/app/api-rest';
import { GlobalService } from 'src/app/core/services/global.service';
import { SecurityService } from 'src/app/core/services/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form!: FormGroup;
  authenticateRequest!: AuthenticateRequestModel;
  constructor(private _fb: FormBuilder,
    private _auth: SecurityService,
    private _router: Router,
    private _global: GlobalService) {
    this.form = this._fb.group({
      password: [{value: '', disabled: false} , {validators: Validators.compose([Validators.required])}],
      email: [{value: '', disabled: false} ,{validators:Validators.compose([Validators.required, Validators.email])}]
    });
  }

  login(){
    this.authenticateRequest = {
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
      grantType: 'password'
    };

    this._auth.login(this.authenticateRequest)
    .then(result => {
      if (result) {
        this._router.navigate(['/page/home']);
      } else {
        this._global.openSnackBar('Error al iniciar sesión', 'error');
      }
    });
  }


}
