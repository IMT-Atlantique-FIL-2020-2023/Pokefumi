/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Check is the api is up
     * @returns any successful operation
     * @throws ApiError
     */
    public static getApi(): CancelablePromise<{
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api',
        });
    }

}