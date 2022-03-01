/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MatchDto } from '../models/MatchDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class InternalService {

    /**
     * Close a match
     * @param id Id of the match
     * @param requestBody Post match winner and close it
     * @returns MatchDto successful operation
     * @throws ApiError
     */
    public static closeMatch(
        id: number,
        requestBody?: {
            /**
             * The id of the winner
             */
            winnerId: string;
        },
    ): CancelablePromise<MatchDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/internal/matches/{id}/close',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `An error caused by the client`,
            },
        });
    }

}