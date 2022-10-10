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


import * as runtime from '../runtime';
import type {
  PortfolioTag,
} from '../models';
import {
    PortfolioTagFromJSON,
    PortfolioTagToJSON,
} from '../models';

/**
 * 
 */
export class PortfolioTagApi extends runtime.BaseAPI {

    /**
     * ポートフォリオに設定できるタグを一覧で取得します
     * ポートフォリオタグ取得
     */
    async getPortfolioTagListRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<PortfolioTag>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/portfolio-tags`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PortfolioTagFromJSON));
    }

    /**
     * ポートフォリオに設定できるタグを一覧で取得します
     * ポートフォリオタグ取得
     */
    async getPortfolioTagList(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<PortfolioTag>> {
        const response = await this.getPortfolioTagListRaw(initOverrides);
        return await response.value();
    }

}