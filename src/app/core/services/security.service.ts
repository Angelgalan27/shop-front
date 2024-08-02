import { Injectable } from '@angular/core';
import { FrontShopAdminUserService } from 'src/app/api-rest';
import { AuthenticateRequestModel, UserModel } from 'src/app/api-rest';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private _auth: FrontShopAdminUserService) { }


  login(authenticateRequest: AuthenticateRequestModel): Promise<boolean> {
    return new Promise(resolve => {
      this._auth.authenticate(authenticateRequest)
      .subscribe(result => {
        if (result.token) {
          localStorage.setItem('token', result.token);
          localStorage.setItem('user', JSON.stringify(result.user));
          resolve(true);
        } else {
          resolve(false);
        }
      })
    });
  }


  getTokenLocalStorage(): string {
    return localStorage.getItem('token') as string;
  }

  isUserLoged() {
    const token = localStorage.getItem('token') as string;
    return token ? true : false;
  }

  getUserLoged(): UserModel {
    return JSON.parse(localStorage.getItem('user') as string) as UserModel;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('shopSelected');
  }

}
