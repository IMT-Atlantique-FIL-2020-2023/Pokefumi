/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArrayOfMatches } from '../models/ArrayOfMatches';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MatchService {

    /**
     * Number of matchs a day for the last 30 days
     * @returns ArrayOfMatches successful operation
     * @throws ApiError
     */
    public static getMatchsAdayLast30Days(): CancelablePromise<ArrayOfMatches> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/matchs/count-a-day-last-30-days',
        });
    }

}