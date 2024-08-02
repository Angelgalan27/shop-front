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


/**
 * product filter
 */
export interface ProductFilter { 
    /**
     * product name
     */
    name?: string;
    /**
     * product code
     */
    code?: string;
    /**
     * category identity
     */
    categoryId?: string;
    /**
     * product description
     */
    description?: string;
    /**
     * page
     */
    page?: number;
    /**
     * number of result
     */
    numberResult?: number;
}

