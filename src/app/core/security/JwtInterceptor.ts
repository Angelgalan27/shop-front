import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private _auth: SecurityService){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isLoggedIn = this._auth.isUserLoged() && this._auth.getTokenLocalStorage() !== null;
    const isApiUrl = request.url.startsWith(environment.API_BASE_PATH);
    if (isLoggedIn && isApiUrl) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this._auth.getTokenLocalStorage()}`
            }
        });
    }

    return next.handle(request);
  }
}
