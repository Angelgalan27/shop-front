import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { CategoryComboModel, CategoryFilter, CategoryModel, CategoryPageableRequest } from 'src/app/api-rest';
import { Observable } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { FrontShopAdminCategoryService } from 'src/app/api-rest';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<CategoryModel, string> {

  constructor(protected _httpClient: HttpClient,
    protected _errorHandler: ErrorHandlerService,
    private _category: FrontShopAdminCategoryService) {
    super(_httpClient, _errorHandler);
    this._service = this._category;
     }

     getAllByFilter(shopId: string, filter?: CategoryFilter): Observable<CategoryPageableRequest> {
      return new Observable<CategoryPageableRequest>((observer) => {
        this._service.getAll(shopId,filter)
        .subscribe((respuesta: CategoryPageableRequest) => {
          observer.next(respuesta);
          observer.complete();
        }, (error: any) => {
          // this._ir.interpretarRespuesta(error);
          observer.complete();
        })
      });
    }

    getAllCombo(shopId: string): Observable<CategoryComboModel[]> {
      return new Observable<CategoryComboModel[]>(observer => {
        this._service.getAllCombo(shopId)
        .subscribe((respuesta: CategoryComboModel[]) => {
          observer.next(respuesta);
          observer.complete();
        }, (error: any) => {
          // this._ir.interpretarRespuesta(error);
          observer.complete();
        })
      });
    }

    getAllParent(shopId: string): Observable<CategoryModel[]> {
      return new Observable<CategoryModel[]>(observer => {
        this._service.getAllParent(shopId)
        .subscribe((respuesta: CategoryModel[]) => {
          observer.next(respuesta);
          observer.complete();
        }, (error: any) => {
          // this._ir.interpretarRespuesta(error);
          observer.complete();
        })
      });
    }
}
