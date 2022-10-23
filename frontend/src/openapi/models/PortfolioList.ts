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
import type { Portfolio } from './Portfolio';
import {
    PortfolioFromJSON,
    PortfolioFromJSONTyped,
    PortfolioToJSON,
} from './Portfolio';

/**
 * 
 * @export
 * @interface PortfolioList
 */
export interface PortfolioList {
    /**
     * 
     * @type {Array<Portfolio>}
     * @memberof PortfolioList
     */
    portfolios?: Array<Portfolio>;
}

/**
 * Check if a given object implements the PortfolioList interface.
 */
export function instanceOfPortfolioList(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PortfolioListFromJSON(json: any): PortfolioList {
    return PortfolioListFromJSONTyped(json, false);
}

export function PortfolioListFromJSONTyped(json: any, ignoreDiscriminator: boolean): PortfolioList {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'portfolios': !exists(json, 'portfolios') ? undefined : ((json['portfolios'] as Array<any>).map(PortfolioFromJSON)),
    };
}

export function PortfolioListToJSON(value?: PortfolioList | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'portfolios': value.portfolios === undefined ? undefined : ((value.portfolios as Array<any>).map(PortfolioToJSON)),
    };
}

