import { Component, Output , EventEmitter} from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { ShopModel, UserModel } from 'src/app/api-rest';
import { PermissionService } from 'src/app/core/security/permission.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { MenuService, optionsMenu } from 'src/app/core/services/menu.service';
import { SecurityService } from 'src/app/core/services/security.service';
import { MenuBottomMobileComponent } from '../../components/menu-bottom-mobile/menu-bottom-mobile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output() eventEmmiterShowMenu: EventEmitter<boolean> = new EventEmitter();
  showMenu = true;
  user!: UserModel;
  shopSelected: ShopModel = {id: ''};
  optionsMenu: optionsMenu[] = [];
  constructor(private _auth: SecurityService,
    private _router: Router,
    private _global: GlobalService,
    private _menu: MenuService,
    public _permission: PermissionService,
    private _bottomSheet: MatBottomSheet) {
      this.user = this._auth.getUserLoged();
      this.shopSelected = this._global.getShop() != null ? this._global.getShop() : {id: ''};
      this.optionsMenu = this._menu.getMenu();
  }
  changeShowMenu() {
    this.showMenu = !this.showMenu;
    this.eventEmmiterShowMenu.emit(this.showMenu);
  }

  logout() {
    this._auth.logout();
    this._router.navigate(['/login']);
  }

  changeShop(shopId: string) {
    const shop = this.user.shops?.find(shop => shop.id === shopId) as ShopModel;
    this._global.setShop(shop);
    window.location.reload();
  }

  openBottomSheet(): void {
    this._bottomSheet.open(MenuBottomMobileComponent);
  }
}
