/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Pokemon } from '../models/Pokemon';
import type { TypePokemon } from '../models/TypePokemon';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PokemonService {

    /**
     * Get the list of existing pokemons
     * @returns Pokemon The list of pokemons
     * @throws ApiError
     */
    public static getPokemons(): CancelablePromise<Array<Pokemon>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pokemons',
        });
    }

    /**
     * Get the pokemon for a given id
     * @param id Pokemon ID
     * @returns Pokemon The pokemon for a given id
     * @throws ApiError
     */
    public static getPokemonById(
        id: number,
    ): CancelablePromise<Pokemon> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pokemons/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Get the pokemon for a given name
     * @param name Pokemon name
     * @returns Pokemon The pokemon for a given name
     * @throws ApiError
     */
    public static getPokemonByName(
        name: string,
    ): CancelablePromise<Pokemon> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pokemons/name/{name}',
            path: {
                'name': name,
            },
        });
    }

    /**
     * Get the list of existing types
     * @returns TypePokemon The list of types
     * @throws ApiError
     */
    public static getTypes(): CancelablePromise<Array<TypePokemon>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/types',
        });
    }

    /**
     * Get the type for a given id
     * @param id type ID
     * @returns TypePokemon The type for a given id
     * @throws ApiError
     */
    public static getTypeById(
        id: number,
    ): CancelablePromise<TypePokemon> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/types/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Get the type for a given name
     * @param name type name
     * @returns TypePokemon The type for a given name
     * @throws ApiError
     */
    public static getTypeByName(
        name: string,
    ): CancelablePromise<TypePokemon> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/types/name/{name}',
            path: {
                'name': name,
            },
        });
    }

}