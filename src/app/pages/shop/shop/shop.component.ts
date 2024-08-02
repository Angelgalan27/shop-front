import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ShopModel } from 'src/app/api-rest';
import { GlobalService } from 'src/app/core/services/global.service';
import { ShopService } from 'src/app/core/services/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {

  form!: FormGroup;
  shop: ShopModel = {};
  constructor(private _fb: FormBuilder,
    private _shop: ShopService,
    private _global: GlobalService,
    private _translate: TranslateService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {
    this.form = this._fb.group({
      name: [{value: '', disabled: false} , {validators: Validators.compose([Validators.required])}],
      url: [{value: '', disabled: false} , {validators: Validators.compose([Validators.required])}],
      startDate: [{value: '', disabled: false}],
      online: [{value: '', disabled: false}]
    });

    this._activatedRoute.paramMap
    .subscribe((param: Params) => {
      const id = param['get']('id');
      if (id && id != 'new') {
        this._shop.getById(id)
        .subscribe(shop => {
          this.shop = shop;
          this.loadData();
        })
      }
    });
  }



  save() {

    this.mapData();

    if(this.shop.id) {
      this._shop.save(this.shop)
      .subscribe(() => {
        this._global.openSnackBar(this._translate.instant('global.msgs.saveCorrect'), this._translate.instant('shops.shop'));
        this.back();
      });
    } else {
      this._shop.update(this.shop)
      .subscribe(() => {
        this._global.openSnackBar(this._translate.instant('global.msgs.updateCorrect'), this._translate.instant('shops.shop'));
        this.back();
      });
    }

  }

  back() {
    this._router.navigate(['page/shop/list']);
  }

  mapData() {
    this.shop.name = this.form.controls['name'].value;
    this.shop.url = this.form.controls['url'].value;
    this.shop.startDate = this.form.controls['startDate'].value;
    this.shop.online = this.form.controls['online'].value;
  }

  loadData() {
    this.form.controls['name'].setValue(this.shop.name);
    this.form.controls['url'].setValue(this.shop.url);
    this.form.controls['startDate'].setValue(this.shop.startDate);
    this.form.controls['online'].setValue(this.shop.online);
  }
}
