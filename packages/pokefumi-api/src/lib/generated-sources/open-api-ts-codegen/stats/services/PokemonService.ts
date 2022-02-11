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
     * Number of matchs for a specific pokemon
     * Returns the number of matchs for a specific pokemon
     * @param id Pokemon ID
     * @returns any successful operation
     * @throws ApiError
     */
    public static getNumberOfMatchsByPokemon(
        id: PokemonID,
    ): CancelablePromise<{
        /**
         * Pokemon's id used in the request
         */
        id?: number;
        /**
         * Number of matchs for this pokemon
         */
        numberOfMatchs?: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pokemons/{id}/number-of-matchs',
            path: {
                'id': id,
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
        });
    }

    /**
     * List of pokemons with their number of matchs
     * Returns the list of pokemons with their number of matchs
     * @returns ArrayOfPokemons successful operation
     * @throws ApiError
     */
    public static getPokemonsWithNumberOfMatchs(): CancelablePromise<ArrayOfPokemons> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pokemons/matchs',
        });
    }

}