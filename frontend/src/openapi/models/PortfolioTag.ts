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
 * @interface PortfolioTag
 */
export interface PortfolioTag {
    /**
     * 
     * @type {number}
     * @memberof PortfolioTag
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof PortfolioTag
     */
    text?: string;
}

/**
 * Check if a given object implements the PortfolioTag interface.
 */
export function instanceOfPortfolioTag(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PortfolioTagFromJSON(json: any): PortfolioTag {
    return PortfolioTagFromJSONTyped(json, false);
}

export function PortfolioTagFromJSONTyped(json: any, ignoreDiscriminator: boolean): PortfolioTag {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'text': !exists(json, 'text') ? undefined : json['text'],
    };
}

export function PortfolioTagToJSON(value?: PortfolioTag | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'text': value.text,
    };
}

