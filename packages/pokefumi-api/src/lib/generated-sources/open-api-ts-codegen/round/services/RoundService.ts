/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Pokemon } from '../models/Pokemon';
import type { RoundResultDto } from '../models/RoundResultDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RoundService {

    /**
     * Get the result of a round for two given pokemon ids
     * @param id1 pokemon1 id
     * @param id2 pokemon2 id
     * @returns Pokemon The winning pokemon
     * @throws ApiError
     */
    public static getRoundsResultById(
        id1: string,
        id2: string,
    ): CancelablePromise<Pokemon> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/round/{id1}/{id2}',
            path: {
                'id1': id1,
                'id2': id2,
            },
        });
    }

    /**
     * Get the result of a round for two given pokemon names
     * @param name1 pokemon1 name
     * @param name2 pokemon2 name
     * @returns Pokemon The winning pokemon
     * @throws ApiError
     */
    public static getRoundsResultByName(
        name1: string,
        name2: string,
    ): CancelablePromise<Pokemon> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/round/name/{name1}/{name2}',
            path: {
                'name1': name1,
                'name2': name2,
            },
        });
    }

    /**
     * Play the round for a given user and a given match
     * @param requestBody
     * @returns RoundResultDto The winning pokemon
     * @throws ApiError
     */
    public static playRound(
        requestBody?: any,
    ): CancelablePromise<RoundResultDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/match',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                408: `Timeout the other player didn't responded within the allowed delay`,
            },
        });
    }

}