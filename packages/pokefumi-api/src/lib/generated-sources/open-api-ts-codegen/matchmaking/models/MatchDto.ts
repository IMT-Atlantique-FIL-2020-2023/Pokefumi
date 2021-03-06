/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MatchDto = {
    /**
     * The id of the match
     */
    id: number;
    /**
     * The date of the creation
     */
    createdAt: string;
    /**
     * The date of the last update
     */
    updatedAt: string;
    /**
     * The pokemons ids of the author
     */
    authorPokemons: Array<number>;
    /**
     * The pokemons ids of the opponent
     */
    opponentPokemons?: Array<number>;
    /**
     * The id of the author
     */
    authorId: number;
    /**
     * The id of the opponent
     */
    opponentId: number;
    /**
     * The status of the match
     */
    status: MatchDto.status;
    /**
     * The id of the winner. If the winner is a draw, the winnerId is null and the match status is set to finished
     */
    winnerId?: number;
};

export namespace MatchDto {

    /**
     * The status of the match
     */
    export enum status {
        WAITING_INVITE = 'waitingInvite',
        STARTED = 'started',
        FINISHED = 'finished',
    }


}
