/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateMatchDto } from '../models/CreateMatchDto';
import type { DeckDto } from '../models/DeckDto';
import type { MatchDto } from '../models/MatchDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MatchesService {

    /**
     * Get all matches
     * @returns string successful operation
     * @throws ApiError
     */
    public static getAllMatches(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/matchs',
        });
    }

    /**
     * Create a match
     * @param requestBody Match to create
     * @returns MatchDto successful operation
     * @throws ApiError
     */
    public static createMatch(
        requestBody?: CreateMatchDto,
    ): CancelablePromise<MatchDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/matchs',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `An error caused by the client`,
            },
        });
    }

    /**
     * Get a match by id
     * @param id Id of the match
     * @returns MatchDto successful operation
     * @throws ApiError
     */
    public static getMatchById(
        id: number,
    ): CancelablePromise<MatchDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/matchs/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Get all matches that are waiting for an invitation for the connected player
     * @returns any successful operation
     * @throws ApiError
     */
    public static getAllMatchesWaitingForInvitation(): CancelablePromise<Array<{
        /**
         * The id of the match
         */
        id: number;
        /**
         * The id of the player opponent
         */
        authorId?: string;
    }>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/matchs/invitation',
        });
    }

    /**
     * Join a match
     * @param id Id of the match
     * @param requestBody Deck
     * @returns MatchDto successful operation
     * @throws ApiError
     */
    public static joinMatch(
        id: number,
        requestBody?: DeckDto,
    ): CancelablePromise<MatchDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/matchs/{id}/join',
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