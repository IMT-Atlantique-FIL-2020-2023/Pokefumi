/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PokemonID } from './PokemonID';

export type CreateMatchDto = {
    /**
     * Id of the opponent
     */
    opponentId: number;
    /**
     * Deck of the player
     */
    deck?: Array<PokemonID>;
};
