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
          sessionStorage.setItem('token', result.token);
          sessionStorage.setItem('user', JSON.stringify(result.user));
          resolve(true);
        } else {
          resolve(false);
        }
      })
    });
  }


  getTokenLocalStorage(): string {
    return sessionStorage.getItem('token') as string;
  }

  isUserLoged() {
    const token = sessionStorage.getItem('token') as string;
    return token ? true : false;
  }

  getUserLoged(): UserModel {
    return JSON.parse(sessionStorage.getItem('user') as string) as UserModel;
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('shopSelected');
  }

}
