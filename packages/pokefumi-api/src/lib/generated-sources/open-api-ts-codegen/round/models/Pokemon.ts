/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TypePokemon } from './TypePokemon';

/**
 * A POKEMON :o
 */
export type Pokemon = {
    /**
     * Pokemon's id
     */
    id?: number;
    /**
     * Pokemon's name
     */
    name?: string;
    /**
     * List of the types for this pokemon
     */
    types?: Array<TypePokemon>;
};
