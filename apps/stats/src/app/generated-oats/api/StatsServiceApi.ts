import { GetNumberOfRoundsByPokemonServerRequest } from '../requests/GetNumberOfRoundsByPokemonServerRequest';
import { GetNumberOfVictoriesByPokemonServerRequest } from '../requests/GetNumberOfVictoriesByPokemonServerRequest';
import { UploadStatRowServerRequest } from '../requests/UploadStatRowServerRequest';
import { GetNumberOfRoundsByPokemonResponse } from '../responses/GetNumberOfRoundsByPokemonResponse';
import { GetNumberOfVictoriesByPokemonResponse } from '../responses/GetNumberOfVictoriesByPokemonResponse';
import { GetPokemonsWithNumberOfRoundsResponse } from '../responses/GetPokemonsWithNumberOfRoundsResponse';
import { GetRoundsAdayLast30DaysResponse } from '../responses/GetRoundsAdayLast30DaysResponse';
import { UploadStatRowResponse } from '../responses/UploadStatRowResponse';

export type StatsServiceApi<T> = {
  /**
   * Number of rounds for a specific pokemon
   *
   * Returns the number of rounds for a specific pokemon
   */
  getNumberOfRoundsByPokemon(request: GetNumberOfRoundsByPokemonServerRequest, toolkit: T): Promise<GetNumberOfRoundsByPokemonResponse>;
  /**
   * Number of victories for a specific pokemon
   *
   * Returns the number of victories for a specific pokemon
   */
  getNumberOfVictoriesByPokemon(request: GetNumberOfVictoriesByPokemonServerRequest, toolkit: T): Promise<GetNumberOfVictoriesByPokemonResponse>;
  /**
   * List of pokemons with their number of rounds
   *
   * Returns the list of pokemons with their number of rounds
   */
  getPokemonsWithNumberOfRounds(toolkit: T): Promise<GetPokemonsWithNumberOfRoundsResponse>;
  /**
   * Number of rounds a day for the last 30 days
   */
  getRoundsAdayLast30Days(toolkit: T): Promise<GetRoundsAdayLast30DaysResponse>;
  /**
   * Upload stats
   *
   * Upload stats
   */
  uploadStatRow(request: UploadStatRowServerRequest, toolkit: T): Promise<UploadStatRowResponse>;
};
