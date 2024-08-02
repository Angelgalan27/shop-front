import { Injectable } from '@angular/core';

export interface optionsMenu {
  name: string,
  icon?: string,
  routerLink?: string,
  children?: {name: string, routerLink: string, permission?: string[]}[],
  permission?: string[]
  isUnique?: boolean
}


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }


  getMenu(): optionsMenu[] {
    return [
      {
        name: 'users.users',
        icon: 'group',
        routerLink: '/page/user/list',
        permission: ['USER_MENU'],
        isUnique: true
      },
      {
        name: 'roles.roles',
        icon: 'supervisor_account',
        routerLink: '/page/rol/list',
        permission: ['ROL_MENU'],
        isUnique: true
      },
      {
        name: 'shops.shops',
        icon: 'store',
        routerLink: '/page/shop/list',
        permission: ['SHOP_MENU'],
        isUnique: true
      },
      {
        name: 'categories.categories',
        icon: 'category',
        routerLink: '/page/category/list',
        permission: ['CATEGORY_MENU'],
        isUnique: true
      },
      {
        name: 'attributesTypes.attributesTypes',
        icon: 'edit_attributes',
        routerLink: '/page/attributetype/list',
        permission: ['ATTRIBUTE_TYPE_MENU'],
        isUnique: true

      },
      {
        name: 'providers.providers',
        icon: 'diversity_3',
        routerLink: '/page/supplier/list',
        permission: ['SUPPLIER_MENU'],
        isUnique: true
      },
      {
        name: 'products.products',
        icon: 'inventory_2',
        routerLink: '/page/product/list',
        permission: ['PRODUCT_MENU'],
        isUnique: true
      },
      {
        name: 'entranceProductStock.entranceProductStock',
        icon: 'store',
        routerLink: '/page/entrance-product-stock/list',
        permission: ['STORE_MENU'],
        isUnique: true
      },
      /*{
        name: 'bills.bills',
        icon: 'receipt_long',
        routerLink: '/page/bill/list',
        permission: ['BILL_MENU'],
        isUnique: true
      },
      {
        name: 'sellings.sellings',
        icon: 'sell',
        routerLink: '/page/sell/list',
        permission: ['SELL_MENU'],
        isUnique: true
      },*/
      /*{
        name: 'global.exports',
        icon: 'description',
        children: [
          {
            name: 'Products',
            routerLink: '/page/export/products'
          }
        ],
        permission: ['EXPORT_MENU']
      }*/
    ];
  }
}
