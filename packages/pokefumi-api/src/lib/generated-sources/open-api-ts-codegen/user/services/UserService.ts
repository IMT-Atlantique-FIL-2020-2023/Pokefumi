/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * List of all users
     * @returns User successful operation
     * @throws ApiError
     */
    public static get(): CancelablePromise<Array<User>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users',
        });
    }

    /**
     * Add a new user
     * @param requestBody Optional description in *Markdown*
     * @returns any Created
     * @throws ApiError
     */
    public static post(
        requestBody: User,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                409: `unsuccessful operation`,
            },
        });
    }

    /**
     * Retrieves a specific user
     * @param id The user ID
     * @returns User successful operation
     * @throws ApiError
     */
    public static get1(
        id: number,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{id}',
            path: {
                'id': id,
            },
        });
    }

}