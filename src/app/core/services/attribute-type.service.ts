import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { AttributeTypeModel, FrontShopAdminAttributeTypeService } from 'src/app/api-rest';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AttributeTypeService extends BaseService<AttributeTypeModel, string> {

  constructor(protected _httpClient: HttpClient,
    protected _errorHandler: ErrorHandlerService,
    private _attributeType: FrontShopAdminAttributeTypeService) {
    super(_httpClient, _errorHandler);
    this._service = this._attributeType;
   }
}
