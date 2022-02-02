import { ClientAdapter } from '@oats-ts/openapi-http';
import { getMatchsAdayLast30Days } from '../operations/getMatchsAdayLast30Days';
import { getNumberOfMatchsByPokemon } from '../operations/getNumberOfMatchsByPokemon';
import { getNumberOfVictoriesByPokemon } from '../operations/getNumberOfVictoriesByPokemon';
import { getPokemonsWithNumberOfMatchs } from '../operations/getPokemonsWithNumberOfMatchs';
import { GetNumberOfMatchsByPokemonRequest } from '../requests/GetNumberOfMatchsByPokemonRequest';
import { GetNumberOfVictoriesByPokemonRequest } from '../requests/GetNumberOfVictoriesByPokemonRequest';
import { GetMatchsAdayLast30DaysResponse } from '../responses/GetMatchsAdayLast30DaysResponse';
import { GetNumberOfMatchsByPokemonResponse } from '../responses/GetNumberOfMatchsByPokemonResponse';
import { GetNumberOfVictoriesByPokemonResponse } from '../responses/GetNumberOfVictoriesByPokemonResponse';
import { GetPokemonsWithNumberOfMatchsResponse } from '../responses/GetPokemonsWithNumberOfMatchsResponse';
import { StatsServiceSdk } from './StatsServiceSdk';

export class StatsServiceSdkImpl implements StatsServiceSdk {
  protected readonly config: ClientAdapter;
  public constructor(config: ClientAdapter) {
    this.config = config;
  }
  public async getMatchsAdayLast30Days(): Promise<GetMatchsAdayLast30DaysResponse> {
    return getMatchsAdayLast30Days(this.config);
  }
  public async getNumberOfMatchsByPokemon(input: GetNumberOfMatchsByPokemonRequest): Promise<GetNumberOfMatchsByPokemonResponse> {
    return getNumberOfMatchsByPokemon(input, this.config);
  }
  public async getNumberOfVictoriesByPokemon(input: GetNumberOfVictoriesByPokemonRequest): Promise<GetNumberOfVictoriesByPokemonResponse> {
    return getNumberOfVictoriesByPokemon(input, this.config);
  }
  public async getPokemonsWithNumberOfMatchs(): Promise<GetPokemonsWithNumberOfMatchsResponse> {
    return getPokemonsWithNumberOfMatchs(this.config);
  }
}
