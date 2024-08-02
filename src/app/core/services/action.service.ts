import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ActionModel, FrontShopAdminActionService } from 'src/app/api-rest';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ActionService extends BaseService<ActionModel, string>{

  constructor(protected _httpClient: HttpClient,
    protected _errorHandler: ErrorHandlerService,
    protected _action: FrontShopAdminActionService) {
    super(_httpClient, _errorHandler);
    this._service = _action;
   }
}
