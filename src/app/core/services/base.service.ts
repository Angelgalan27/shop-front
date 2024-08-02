import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OperationOutcome } from 'src/app/api-rest';
import { ErrorHandlerService } from './error-handler.service';
@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T, ID> {

  _service: any;
  constructor(protected httpClient: HttpClient,
    protected _errorHandlerService: ErrorHandlerService) { }

  getAll(shopId?: string): Observable<T[]> {
    return new Observable<T[]>((observer) => {
      this._service.getAll(shopId)
      .subscribe((respuesta: T[]) => {
        observer.next(respuesta);
        observer.complete();
      }, (error: any) => {
        this._errorHandlerService.handler(error.error);
        observer.complete();
      })
    });
  }

  getById(id: ID): Observable<T> {
    return new Observable<T>((observer) => {
      this._service.getById(id)
      .subscribe((respuesta: T) => {
        observer.next(respuesta);
        observer.complete();
      }, (error: any) => {
        this._errorHandlerService.handler(error.error);
        observer.complete();
      })
    });
  }

  save(t: T): Observable<T> {
    return new Observable<T>((observer) => {
      this._service.save(t)
      .subscribe((respuesta: T) => {
        observer.next(respuesta);
        observer.complete();
      }, (error: any) => {
        this._errorHandlerService.handler(error.error);
        observer.complete();
      })
    });
  }

  update(t: T): Observable<T>  {
    return new Observable<T>((observer) => {
      this._service.update(t)
      .subscribe((respuesta: T) => {
        observer.next(respuesta);
        observer.complete();
      }, (error: any) => {
        this._errorHandlerService.handler(error.error);
        observer.complete();
      })
    });
  }

  deleteById(id: ID): Observable<OperationOutcome>  {
    return new Observable<OperationOutcome>((observer) => {
      this._service.deleteById(id)
      .subscribe((respuesta: OperationOutcome) => {
        observer.next(respuesta);
        observer.complete();
      }, (error: any) => {
        this._errorHandlerService.handler(error.error);
        observer.complete();
      })
    });
  }
}
