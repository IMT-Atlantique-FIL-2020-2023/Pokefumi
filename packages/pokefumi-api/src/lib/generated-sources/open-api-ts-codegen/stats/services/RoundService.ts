/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArrayOfRounds } from '../models/ArrayOfRounds';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RoundService {

    /**
     * Number of rounds a day for the last 30 days
     * @returns ArrayOfRounds successful operation
     * @throws ApiError
     */
    public static getRoundsAdayLast30Days(): CancelablePromise<ArrayOfRounds> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/rounds/count-a-day-last-30-days',
        });
    }

}