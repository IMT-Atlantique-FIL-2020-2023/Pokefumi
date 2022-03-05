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
    public static getAllUsers(): CancelablePromise<Array<User>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users',
        });
    }

    /**
     * Add a new user
     * @param requestBody
     * @returns User Created
     * @throws ApiError
     */
    public static createUser(
        requestBody: User,
    ): CancelablePromise<User> {
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
     * Connect the user
     * @param username
     * @param password
     * @returns string Authentificated, return the token
     * @throws ApiError
     */
    public static connectUser(
        username: string,
        password: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/connect',
            query: {
                'username': username,
                'password': password,
            },
            errors: {
                401: `wrong credentials`,
            },
        });
    }

    /**
     * Retrieves a specific user
     * @param id The user ID
     * @returns User successful operation
     * @throws ApiError
     */
    public static getUserById(
        id: number,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `invalid credentials`,
            },
        });
    }

}