/**
 * @module botbuilder-ai
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * NOTE: This class was auto generated by OpenAPI Generator (https://openapi-generator.tech)
 * and was manually modified to make it compliant with the current implementation of the library.
 */

import localVarRequest = require('request');
import http = require('http');
import * as HttpStatus from 'http-status-codes';

/* tslint:disable:no-unused-locals */
import { LuisResult } from './model/luisResult';

import { ObjectSerializer, Authentication, VoidAuth } from './model/models';
import { ApiKeyAuth } from './model/models';

let luisVersion = '/luis/v2.0';

export interface PredictionResolveOptionalParams {
    /**
     * The timezone offset for the location of the request.
     */
    timezoneOffset?: number;
    /**
     * If true, return all intents instead of just the top scoring intent.
     */
    verbose?: boolean;
    /**
     * Use the staging endpoint slot.
     */
    staging?: boolean;
    /**
     * Enable spell checking.
     */
    spellCheck?: boolean;
    /**
     * The subscription key to use when enabling bing spell check
     */
    bingSpellCheckSubscriptionKey?: string;
    /**
     * Log query (default is true)
     */
    log?: boolean;

    customHeaders: {headers: {[name: string]: string}};
}

export enum LuisApikeys {
    apiKeyHeader,
}

export class LuisClient {
    protected _basePath: string = '';
    protected defaultHeaders: any = {};
    protected _useQuerystring: boolean = false;

    protected authentications = {
        'default': new VoidAuth() as Authentication,
        'apiKeyHeader': new ApiKeyAuth('header', 'Ocp-Apim-Subscription-Key'),
    }

    public constructor(basePath: string){
        if (basePath) {
            this.basePath = basePath + luisVersion;
        }
    }

    public set useQuerystring(value: boolean) {
        this._useQuerystring = value;
    }

    public set basePath(basePath: string) {
        this._basePath = basePath;
    }

    public get basePath(): string {
        return this._basePath;
    }

    public setDefaultAuthentication(auth: Authentication): void {
        this.authentications.default = auth;
    }

    public setApiKey(key: LuisApikeys, value: string): void {
        (this.authentications as any)[LuisApikeys[key]].apiKey = value;
    }

    /** 
     * Returns the local URL
     * @param appId The appId.
     * @returns String
    */
    private getLocalURL(appId: string): string {
        return this.basePath + '/apps/' + encodeURIComponent(appId); 
    }

    /**
     * Gets predictions for a given utterance, in the form of intents and entities. The current maximum query size is 500 characters.
     * @param query The utterance to predict.
     * @param appId The LUIS application ID (Guid).
     * @param [options] The optional parameters
     * @returns Promise<LuisResult>
     */
    public async predictionResolvePost(query: string, appId: string, options: PredictionResolveOptionalParams): Promise<LuisResult> {
        const localVarPath = this.getLocalURL(appId);

        let localVarQueryParameters: any = {};
        let localVarHeaderParams = this.defaultHeaders
        let localVarFormParams: any = {};

        // verify required parameter 'query' is not null or undefined
        if (query === null || query === undefined) {
            throw new Error('Required parameter query was null or undefined when calling predictionResolve.');
        }

        // verify required parameter 'appId' is not null or undefined
        if (appId === null || appId === undefined) {
            throw new Error('Required parameter appId was null or undefined when calling predictionResolve.');
        }

        if (!options.customHeaders) {
            options.customHeaders = {headers: {}}
        }

        if (options.timezoneOffset !== undefined) {
            localVarQueryParameters['timezoneOffset'] = ObjectSerializer.serialize(options.timezoneOffset, 'number');
        }

        if (options.verbose !== undefined) {
            localVarQueryParameters['verbose'] = ObjectSerializer.serialize(options.verbose, 'boolean');
        }

        if (options.staging !== undefined) {
            localVarQueryParameters['staging'] = ObjectSerializer.serialize(options.staging, 'boolean');
        }

        if (options.spellCheck !== undefined) {
            localVarQueryParameters['spellCheck'] = ObjectSerializer.serialize(options.spellCheck, 'boolean');
        }

        if (options.bingSpellCheckSubscriptionKey !== undefined) {
            localVarQueryParameters['bing-spell-check-subscription-key'] = ObjectSerializer.serialize(options.bingSpellCheckSubscriptionKey, 'string');
        }

        if (options.log !== undefined) {
            localVarQueryParameters['log'] = ObjectSerializer.serialize(options.log, 'boolean');
        }

        Object.assign(localVarHeaderParams, options.customHeaders.headers);

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            maxRedirects: 21,
            body: ObjectSerializer.serialize(query, 'string')
        };

        this.authentications.apiKeyHeader.applyToRequest(localVarRequestOptions);

        this.authentications.default.applyToRequest(localVarRequestOptions);

        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                (<any>localVarRequestOptions).formData = localVarFormParams;
            } else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise<LuisResult>((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, luisResult) => {
                if (error) {
                    reject(error);
                } else {
                    luisResult = ObjectSerializer.deserialize(luisResult, 'LuisResult');
                    if (response.statusCode && response.statusCode >= HttpStatus.OK && response.statusCode < HttpStatus.MULTIPLE_CHOICES) {
                        resolve(luisResult);
                    } else {
                        reject({
                            response: {
                                response: response,
                                headers:
                                    response.headers,
                                body: response.body,
                                status:
                                    response.statusCode
                            }
                        });
                    }
                }
            });
        });
    }
    /**
     * Gets predictions for a given utterance, in the form of intents and entities. The current maximum query size is 500 characters.
     * @param appId The LUIS application ID (guid).
     * @param query The utterance to predict.
     * @param [options] The optional parameters
     * @returns Promise<LuisResult>
     */
    public async predictionResolveGet(appId: string, query: string, options: PredictionResolveOptionalParams): Promise<LuisResult> {
        const localVarPath = this.getLocalURL(appId);

        let localVarQueryParameters: any = {};
        let localVarHeaderParams = (Object as any).assign({}, this.defaultHeaders) as any;
        let localVarFormParams: any = {};

        // verify required parameter 'appId' is not null or undefined
        if (appId === null || appId === undefined) {
            throw new Error('Required parameter appId was null or undefined when calling predictionResolve2.');
        }

        // verify required parameter 'query' is not null or undefined
        if (query === null || query === undefined) {
            throw new Error('Required parameter q was null or undefined when calling predictionResolve2.');
        }

        if (options.customHeaders === null || options.customHeaders === undefined) {
            options.customHeaders = {headers: {}}
        }

        if (query !== undefined) {
            localVarQueryParameters['query'] = ObjectSerializer.serialize(query, 'string');
        }

        if (options.timezoneOffset !== undefined) {
            localVarQueryParameters['timezoneOffset'] = ObjectSerializer.serialize(options.timezoneOffset, 'number');
        }

        if (options.verbose !== undefined) {
            localVarQueryParameters['verbose'] = ObjectSerializer.serialize(options.verbose, 'boolean');
        }

        if (options.staging !== undefined) {
            localVarQueryParameters['staging'] = ObjectSerializer.serialize(options.staging, 'boolean');
        }

        if (options.spellCheck !== undefined) {
            localVarQueryParameters['spellCheck'] = ObjectSerializer.serialize(options.spellCheck, 'boolean');
        }

        if (options.bingSpellCheckSubscriptionKey !== undefined) {
            localVarQueryParameters['bing-spell-check-subscription-key'] = ObjectSerializer.serialize(options.bingSpellCheckSubscriptionKey, 'string');
        }

        if (options.log !== undefined) {
            localVarQueryParameters['log'] = ObjectSerializer.serialize(options.log, 'boolean');
        }

        (Object as any).assign(localVarHeaderParams, options.customHeaders.headers);

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            maxRedirects: 21,
            body: ObjectSerializer.serialize(query, 'string')
        };

        this.authentications.apiKeyHeader.applyToRequest(localVarRequestOptions);

        this.authentications.default.applyToRequest(localVarRequestOptions);

        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                (<any>localVarRequestOptions).formData = localVarFormParams;
            } else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise<LuisResult>((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, luisResult) => {
                if (error) {
                    reject(error);
                } else {
                    luisResult = ObjectSerializer.deserialize(luisResult, 'LuisResult');
                    if (response.statusCode && response.statusCode >= HttpStatus.OK && response.statusCode < HttpStatus.MULTIPLE_CHOICES) {
                        resolve(luisResult);
                    } else {
                        reject({
                            response: {
                                response: response,
                                headers:
                                    response.headers,
                                body: response.body,
                                status:
                                    response.statusCode
                            }
                        });
                    }
                }
            });
        });
    }
}
