import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShopModel } from 'src/app/api-rest';
import { ConfirmDialogComponent } from 'src/app/theme/components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  selectedShop!: ShopModel;
  constructor(
    private _snackBar: MatSnackBar,
    private dialog: MatDialog) { }


  getShop() {
    if (!this.selectedShop) {
      this.selectedShop = JSON.parse(localStorage.getItem('shopSelected') as string) as ShopModel;
    }
    return this.selectedShop;
  }

  setShop(shop: ShopModel) {
    this.selectedShop = shop;
    localStorage.setItem('shopSelected', JSON.stringify(shop));
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 3000});
  }

  confirmDialog(message: string): Promise<boolean> {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {message},
      });

      dialogRef.afterClosed().subscribe(result => {
        resolve(result);
      });
    });

  }

}
