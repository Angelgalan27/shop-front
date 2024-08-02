import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';
import { GlobalService } from '../services/global.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(private _auth: SecurityService,
    private _global: GlobalService,
    private _router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this._auth.isUserLoged()) {
      this._global.openSnackBar('No tiene permisos para ver este recuros', 'error');
      this._router.navigate(['/login']);
      return false;
    }
    // logged in, so return true
    return true;
  }

}
