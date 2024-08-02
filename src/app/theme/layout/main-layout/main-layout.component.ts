import { AfterContentChecked, AfterContentInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SecurityService } from 'src/app/core/services/security.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  showMenu: boolean = true;
  widthMenu: string = '12%';
  widthContent: string = '88%';
  constructor(private _auth: SecurityService) {

  }


  changeShowMenu(showMenu: boolean) {
    this.showMenu = showMenu;
    if (showMenu) {
      this.widthMenu = '12%';
      this.widthContent = '88%';
    } else {
      this.widthMenu = '0%';
      this.widthContent = '100%';
    }
  }






}
