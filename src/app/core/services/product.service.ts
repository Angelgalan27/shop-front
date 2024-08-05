import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { FileModel, OperationOutcome, ProductFilter, ProductModel, ProductPageableRequest } from 'src/app/api-rest';
import { Observable } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { FrontShopAdminProductService } from 'src/app/api-rest';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<ProductModel, string> {

  constructor(protected _httpClient: HttpClient,
    protected _errorHandler: ErrorHandlerService,
    private _product: FrontShopAdminProductService) {
    super(_httpClient, _errorHandler);
    this._service = this._product;
     }

     getAllByFilter(shopId: string, filter?: ProductFilter): Observable<ProductPageableRequest> {
      if (filter && filter.page === undefined) {
        filter.page = 0;
      }
      if(filter && filter.numberResult === undefined){
        filter.numberResult = 5;
      }
      if (!filter) {
        filter = {page: 0, numberResult: 5};
      }
      return new Observable<ProductPageableRequest>((observer) => {
        this._product.getAll(shopId,filter)
        .subscribe((respuesta: ProductPageableRequest) => {
          observer.next(respuesta);
          observer.complete();
        }, (error: any) => {
          // this._ir.interpretarRespuesta(error);
          observer.complete();
        })
      });
    }

    uploadFiles(productId: string, files: File[]): Observable<OperationOutcome> {
      return new Observable<OperationOutcome>((observer) => {
        this._service.uploadFiles(productId, files)
        .subscribe((respuesta: OperationOutcome) => {
          observer.next(respuesta);
          observer.complete();
        }, (error: any) => {
          // this._ir.interpretarRespuesta(error);
          observer.complete();
        });
      });
    }

    getFiles(fileModel: FileModel): Observable<Blob> {
      return new Observable<Blob>((observer) => {
        this._service.getFileProduct(fileModel)
        .subscribe((respuesta: Blob) => {
          observer.next(respuesta);
          observer.complete();
        }, (error: any) => {
          // this._ir.interpretarRespuesta(error);
          observer.complete();
        });
      });
    }

    deleteFile(productId: string, file: FileModel): Observable<OperationOutcome> {
      return new Observable<OperationOutcome>((observer) => {
        this._service.deleteFileProduct(productId, file)
        .subscribe((respuesta: OperationOutcome) => {
          observer.next(respuesta);
          observer.complete();
        }, (error: any) => {
          // this._ir.interpretarRespuesta(error);
          observer.complete();
        });
      });
    }
}
