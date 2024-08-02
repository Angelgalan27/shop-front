/**
 * API SHOP
 * Servicio de ft shop admin
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { ProductModel } from './productModel';
import { ProviderModel } from './providerModel';
import { ShopModel } from './shopModel';


/**
 * entrance product stock model
 */
export interface EntranceProductStockModel {
    /**
     * identity entrance product stock
     */
    id?: string;
    product?: ProductModel;
    /**
     * total units
     */
    totalUnits?: number;
    /**
     * total cost
     */
    totalCost?: number;
    buyPriceUnit?: number;
    entranceDate?: string;
    shop?: ShopModel;
    provider?: ProviderModel;
}
