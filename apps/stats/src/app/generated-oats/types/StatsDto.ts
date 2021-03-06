export type StatsDto = {
  /**
   * Date of the round
   */
  dateMatch: string;
  /**
   * Round's id
   */
  idMatch: number;
  /**
   * Pokemon's id
   */
  idPokemon: number;
  /**
   * Team of the pokemon
   */
  team: number;
  /**
   * Victory (if true) or defeat
   */
  victory: boolean;
};
