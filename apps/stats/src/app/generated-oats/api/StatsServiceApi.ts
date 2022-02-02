import { GetNumberOfMatchsByPokemonServerRequest } from '../requests/GetNumberOfMatchsByPokemonServerRequest';
import { GetNumberOfVictoriesByPokemonServerRequest } from '../requests/GetNumberOfVictoriesByPokemonServerRequest';
import { GetMatchsAdayLast30DaysResponse } from '../responses/GetMatchsAdayLast30DaysResponse';
import { GetNumberOfMatchsByPokemonResponse } from '../responses/GetNumberOfMatchsByPokemonResponse';
import { GetNumberOfVictoriesByPokemonResponse } from '../responses/GetNumberOfVictoriesByPokemonResponse';
import { GetPokemonsWithNumberOfMatchsResponse } from '../responses/GetPokemonsWithNumberOfMatchsResponse';

export type StatsServiceApi<T> = {
  /**
   * Number of matchs a day for the last 30 days
   */
  getMatchsAdayLast30Days(toolkit: T): Promise<GetMatchsAdayLast30DaysResponse>;
  /**
   * Number of matchs for a specific pokemon
   *
   * Returns the number of matchs for a specific pokemon
   */
  getNumberOfMatchsByPokemon(request: GetNumberOfMatchsByPokemonServerRequest, toolkit: T): Promise<GetNumberOfMatchsByPokemonResponse>;
  /**
   * Number of victories for a specific pokemon
   *
   * Returns the number of victories for a specific pokemon
   */
  getNumberOfVictoriesByPokemon(request: GetNumberOfVictoriesByPokemonServerRequest, toolkit: T): Promise<GetNumberOfVictoriesByPokemonResponse>;
  /**
   * List of pokemons with their number of matchs
   *
   * Returns the list of pokemons with their number of matchs
   */
  getPokemonsWithNumberOfMatchs(toolkit: T): Promise<GetPokemonsWithNumberOfMatchsResponse>;
};
