import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent{
  title = 'shop-admin';

  constructor(private _translateService: TranslateService) {
    this._translateService.setDefaultLang('es');
  }

}
