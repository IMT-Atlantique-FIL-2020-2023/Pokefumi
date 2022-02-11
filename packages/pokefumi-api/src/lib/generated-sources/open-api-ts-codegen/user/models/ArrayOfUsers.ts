/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * array of users
 */
export type ArrayOfUsers = Array<{
    /**
     * id of the user
     */
    id?: number;
    /**
     * name of the user
     */
    username?: string;
    /**
     * status of the user
     */
    statut?: boolean;
    /**
     * score of the player
     */
    score?: number;
    /**
     * password of the user
     */
    password?: string;
}>;