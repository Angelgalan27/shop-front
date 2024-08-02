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
 * authenticate request model
 */
export interface AuthenticateRequestModel { 
    /**
     * user email
     */
    email?: string;
    /**
     * user password
     */
    password?: string;
    /**
     * refresh token
     */
    refreshToken?: string;
    /**
     * grant type authenticate.
     */
    grantType?: string;
}

