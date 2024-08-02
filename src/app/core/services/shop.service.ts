import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ShopModel } from 'src/app/api-rest';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { FrontShopAdminShopService } from 'src/app/api-rest';

@Injectable({
  providedIn: 'root'
})
export class ShopService extends BaseService<ShopModel, string>{

  constructor(private _httpClient: HttpClient,
    protected _errorHandler: ErrorHandlerService,
    private _shop: FrontShopAdminShopService) {
    super(_httpClient, _errorHandler);
    this._service = _shop;
   }
}
