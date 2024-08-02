import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { UserFilter, UserModel, UserPageableRequest } from 'src/app/api-rest';
import { Observable } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { FrontShopAdminUserService } from 'src/app/api-rest';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<UserModel, string> {

  constructor(protected _httpClient: HttpClient,
    protected _errorHandler: ErrorHandlerService,
    private _user: FrontShopAdminUserService) {
    super(_httpClient, _errorHandler);
    this._service = this._user;
   }


   getAllByFilter(filter?: UserFilter): Observable<UserPageableRequest> {
    return new Observable<UserPageableRequest>(observer => {
      this._user.getAll(filter)
      .subscribe((respuesta: UserPageableRequest) => {
        observer.next(respuesta);
        observer.complete();
      }, (error: any) => {
        observer.complete();
      });
    });
   }
}
