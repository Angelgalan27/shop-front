import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { EntranceProductStockFilter, EntranceProductStockModel, EntranceProductStockPageableRequest, ShopProductEntranceProductStockService } from 'src/app/api-rest';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntranceProductStockService extends BaseService<EntranceProductStockModel, string>{

  constructor(protected _httpClient: HttpClient,
    protected _errorHandler: ErrorHandlerService,
    protected _entranceProductStock: ShopProductEntranceProductStockService) {
    super(_httpClient, _errorHandler);
    this._service = this._entranceProductStock;
   }

   getAllByFilter(shopId: string, filter: EntranceProductStockFilter): Observable<EntranceProductStockPageableRequest> {
    return new Observable<EntranceProductStockPageableRequest>(observer => {
      this._service.getAll(shopId, filter)
      .subscribe((entranceProductStock: EntranceProductStockPageableRequest) => {
        observer.next(entranceProductStock);
        observer.complete();
      }, (error: any) => {
        //this._errorHandler.handleError(error);
        observer.complete();
      });
    });
    ;
   }
}
