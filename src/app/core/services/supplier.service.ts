import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { FilterProvider, RequestPageableProvider, ProviderModel, FrontShopAdminProviderService } from 'src/app/api-rest';
import { Observable } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierService extends BaseService<ProviderModel, string> {

  constructor(protected _httpClient: HttpClient,
    protected _errorHandler: ErrorHandlerService,
    private _supplier: FrontShopAdminProviderService) {
    super(_httpClient, _errorHandler);
    this._service = this._supplier;
   }

   getAllByFilter(shopId: string, filter?: FilterProvider): Observable<RequestPageableProvider> {
    return new Observable<RequestPageableProvider>((observer) => {
      this._service.getAll(shopId)
      .subscribe((respuesta: RequestPageableProvider) => {
        observer.next(respuesta);
        observer.complete();
      }, (error: any) => {
        // this._ir.interpretarRespuesta(error);
        observer.complete();
      })
    });
   }
}
