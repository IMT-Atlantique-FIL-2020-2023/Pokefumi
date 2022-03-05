/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class InternalService {

    /**
     * Increment the score of a user by 1
     * @param id The user ID
     * @returns User successful operation
     * @throws ApiError
     */
    public static incrementUserScore(
        id: number,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/internal/users/{id}/increment-score',
            path: {
                'id': id,
            },
            errors: {
                404: `user not found`,
            },
        });
    }

}