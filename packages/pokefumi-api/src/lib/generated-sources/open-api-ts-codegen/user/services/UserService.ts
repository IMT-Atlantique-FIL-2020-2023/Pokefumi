/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArrayOfUsers } from '../models/ArrayOfUsers';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * List of all users
     * @returns ArrayOfUsers successful operation
     * @throws ApiError
     */
    public static get(): CancelablePromise<ArrayOfUsers> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users',
        });
    }

}