import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { RolModel } from 'src/app/api-rest';
import { ErrorHandlerService } from './error-handler.service';
import { FrontShopAdminRolService } from 'src/app/api-rest';

@Injectable({
  providedIn: 'root'
})
export class RolService extends BaseService<RolModel, string>{

  constructor(protected _httpClient: HttpClient,
    protected _errorHandler: ErrorHandlerService,
    private _rol: FrontShopAdminRolService) {
    super(_httpClient, _errorHandler);
    this._service = this._rol;

   }
}
