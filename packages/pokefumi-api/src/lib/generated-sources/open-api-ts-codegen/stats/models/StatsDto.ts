/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type StatsDto = {
    /**
     * Pokemon's id
     */
    idPokemon: number;
    /**
     * Date of the round
     */
    dateMatch: string;
    /**
     * Victory (if true) or defeat
     */
    victory: boolean;
    /**
     * Round's id
     */
    idMatch: number;
    /**
     * Team of the pokemon
     */
    team: number;
};
