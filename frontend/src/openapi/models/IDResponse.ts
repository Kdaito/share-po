/* tslint:disable */
/* eslint-disable */
/**
 * share-po
 * ポートフォリオを共有、評価できるサイトです
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface IDResponse
 */
export interface IDResponse {
    /**
     * 
     * @type {number}
     * @memberof IDResponse
     */
    id?: number;
}

/**
 * Check if a given object implements the IDResponse interface.
 */
export function instanceOfIDResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function IDResponseFromJSON(json: any): IDResponse {
    return IDResponseFromJSONTyped(json, false);
}

export function IDResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): IDResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
    };
}

export function IDResponseToJSON(value?: IDResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
    };
}

