import { Component , ViewChild, Input, OnChanges, SimpleChanges} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { PermissionService } from 'src/app/core/security/permission.service';
import { MenuService, optionsMenu } from 'src/app/core/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnChanges {

  @ViewChild('drawer') drawer!: MatDrawer;
  @Input() showMenu: boolean = false;
  showFiller = false;
  optionsMenu: optionsMenu[] = [];

  constructor(private _menu: MenuService,
    public _permission: PermissionService) {
    this.optionsMenu = this._menu.getMenu();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.drawer) {
      if (changes['showMenu'].currentValue) {
        this.drawer.open();
      } else {
        this.drawer.close();
      }
    }


  }
}
