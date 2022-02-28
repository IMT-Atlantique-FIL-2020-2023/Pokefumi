/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StatsDto } from '../models/StatsDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class StatsService {

    /**
     * Upload stats
     * Upload stats
     * @param requestBody Stats to upload
     * @returns StatsDto successful operation
     * @throws ApiError
     */
    public static uploadStatRow(
        requestBody?: StatsDto,
    ): CancelablePromise<StatsDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/stats',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `An error caused by the client`,
            },
        });
    }

}