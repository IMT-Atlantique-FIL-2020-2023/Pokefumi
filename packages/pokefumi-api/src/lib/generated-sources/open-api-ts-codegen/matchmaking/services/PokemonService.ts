/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArrayOfPokemons } from '../models/ArrayOfPokemons';
import type { PokemonID } from '../models/PokemonID';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PokemonService {

    /**
     * Number of rounds for a specific pokemon
     * Returns the number of rounds for a specific pokemon
     * @param id Pokemon ID
     * @returns any successful operation
     * @throws ApiError
     */
    public static getNumberOfRoundsByPokemon(
        id: PokemonID,
    ): CancelablePromise<{
        /**
         * Pokemon's id used in the request
         */
        id?: number;
        /**
         * Number of rounds for this pokemon
         */
        numberOfRounds?: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pokemons/{id}/number-of-rounds',
            path: {
                'id': id,
            },
            errors: {
                400: `An error caused by the client`,
            },
        });
    }

    /**
     * Number of victories for a specific pokemon
     * Returns the number of victories for a specific pokemon
     * @param id Pokemon ID
     * @returns any successful operation
     * @throws ApiError
     */
    public static getNumberOfVictoriesByPokemon(
        id: PokemonID,
    ): CancelablePromise<{
        /**
         * Pokemon's id used in the request
         */
        id?: number;
        /**
         * Number of victories for this pokemon
         */
        numberOfVictories?: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pokemons/{id}/number-of-victories',
            path: {
                'id': id,
            },
            errors: {
                400: `An error caused by the client`,
            },
        });
    }

    /**
     * List of pokemons with their number of rounds
     * Returns the list of pokemons with their number of rounds
     * @returns ArrayOfPokemons successful operation
     * @throws ApiError
     */
    public static getPokemonsWithNumberOfRounds(): CancelablePromise<ArrayOfPokemons> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pokemons/rounds',
        });
    }

}