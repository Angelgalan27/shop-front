import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { FrontShopAdminActionService } from './api/frontShopAdminAction.service';
import { FrontShopAdminAttributeTypeService } from './api/frontShopAdminAttributeType.service';
import { FrontShopAdminCategoryService } from './api/frontShopAdminCategory.service';
import { FrontShopAdminProductService } from './api/frontShopAdminProduct.service';
import { FrontShopAdminProviderService } from './api/frontShopAdminProvider.service';
import { FrontShopAdminRolService } from './api/frontShopAdminRol.service';
import { FrontShopAdminShopService } from './api/frontShopAdminShop.service';
import { FrontShopAdminUserService } from './api/frontShopAdminUser.service';
import { ShopProductEntranceProductStockService } from './api/shopProductEntranceProductStock.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
