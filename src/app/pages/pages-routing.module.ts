import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { GuardService } from '../core/security/GuardService';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
        canActivate: [GuardService]
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        canActivate: [GuardService]
      },
      {
        path: 'rol',
        loadChildren: () => import('./rol/rol.module').then(m => m.RolModule),
        canActivate: [GuardService]
      },
      {
        path: 'shop',
        loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule),
        canActivate: [GuardService]
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
        canActivate: [GuardService]
      },
      {
        path: 'sell',
        loadChildren: () => import('./sell/sell.module').then(m => m.SellModule),
        canActivate: [GuardService]
      },
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then(m => m.CategoryModule),
        canActivate: [GuardService]
      },
      {
        path: 'attributetype',
        loadChildren: () => import('./attribute-type/attribute-type.module').then(m => m.AttributeTypeModule),
        canActivate: [GuardService]
      },
      {
        path: 'supplier',
        loadChildren: () => import('./supplier/supplier.module').then(m => m.SupplierModule),
        canActivate: [GuardService]
      },
      {
        path: 'bill',
        loadChildren: () => import('./bill/bill.module').then(m => m.BillModule),
        canActivate: [GuardService]
      },
      {
        path: 'entrance-product-stock',
        loadChildren: () => import('./entrance-product-stock/entrance-product-stock.module').then(m => m.EntranceProductStockModule),
        canActivate: [GuardService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
