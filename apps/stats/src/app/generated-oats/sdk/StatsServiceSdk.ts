import { GetNumberOfMatchsByPokemonRequest } from '../requests/GetNumberOfMatchsByPokemonRequest';
import { GetNumberOfVictoriesByPokemonRequest } from '../requests/GetNumberOfVictoriesByPokemonRequest';
import { GetMatchsAdayLast30DaysResponse } from '../responses/GetMatchsAdayLast30DaysResponse';
import { GetNumberOfMatchsByPokemonResponse } from '../responses/GetNumberOfMatchsByPokemonResponse';
import { GetNumberOfVictoriesByPokemonResponse } from '../responses/GetNumberOfVictoriesByPokemonResponse';
import { GetPokemonsWithNumberOfMatchsResponse } from '../responses/GetPokemonsWithNumberOfMatchsResponse';

export type StatsServiceSdk = {
  /**
   * Number of matchs a day for the last 30 days
   */
  getMatchsAdayLast30Days(): Promise<GetMatchsAdayLast30DaysResponse>;
  /**
   * Number of matchs for a specific pokemon
   *
   * Returns the number of matchs for a specific pokemon
   */
  getNumberOfMatchsByPokemon(input: GetNumberOfMatchsByPokemonRequest): Promise<GetNumberOfMatchsByPokemonResponse>;
  /**
   * Number of victories for a specific pokemon
   *
   * Returns the number of victories for a specific pokemon
   */
  getNumberOfVictoriesByPokemon(input: GetNumberOfVictoriesByPokemonRequest): Promise<GetNumberOfVictoriesByPokemonResponse>;
  /**
   * List of pokemons with their number of matchs
   *
   * Returns the list of pokemons with their number of matchs
   */
  getPokemonsWithNumberOfMatchs(): Promise<GetPokemonsWithNumberOfMatchsResponse>;
};
