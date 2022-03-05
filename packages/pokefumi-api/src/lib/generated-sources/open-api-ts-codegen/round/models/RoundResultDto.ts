/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * The result for a round
 */
export type RoundResultDto = {
    /**
     * the id of the winner
     */
    roundWinner: number;
    /**
     * the pokeApi id of the winner's pokemon
     */
    pokemonWinner: number;
    /**
     * the id of the looser
     */
    roundLooser: number;
    /**
     * the pokeApi id of the looser's pokemon
     */
    pokemonLooser: number;
    /**
     * the index of the round
     */
    roundIndex: number;
};
