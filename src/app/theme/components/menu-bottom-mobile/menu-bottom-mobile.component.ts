import { Component, Input } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { PermissionService } from 'src/app/core/security/permission.service';
import { MenuService, optionsMenu } from 'src/app/core/services/menu.service';

@Component({
  selector: 'app-menu-bottom-mobile',
  templateUrl: './menu-bottom-mobile.component.html',
  styleUrls: ['./menu-bottom-mobile.component.scss']
})
export class MenuBottomMobileComponent {

  @Input() options: optionsMenu[] = [];

  constructor(public _permission: PermissionService,
    private _menu: MenuService,
    public _bottomSheetRef: MatBottomSheetRef<MenuBottomMobileComponent>){
    this.options = this._menu.getMenu();
  }
}
