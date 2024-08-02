import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './global.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private _router: Router,
    private _global: GlobalService,
    private _location: Location) { }

  handler(error: {code: number, date: Date, message: string, path: string}) {
    switch(error.code) {
      case 500:
        this._global.openSnackBar('error no controlado', '');
        break;
      case 403:
        this._router.navigate(['/login']);
        break;
      case 404:
        this._global.openSnackBar(error.message, 'Error');
        this._location.back();
        break;
    }
  }
}
