import { GetNumberOfMatchsByPokemonRequest } from '../requests/GetNumberOfMatchsByPokemonRequest';
import { GetNumberOfVictoriesByPokemonRequest } from '../requests/GetNumberOfVictoriesByPokemonRequest';
import { GetMatchsAdayLast30DaysResponse } from '../responses/GetMatchsAdayLast30DaysResponse';
import { GetNumberOfMatchsByPokemonResponse } from '../responses/GetNumberOfMatchsByPokemonResponse';
import { GetNumberOfVictoriesByPokemonResponse } from '../responses/GetNumberOfVictoriesByPokemonResponse';
import { GetPokemonsWithNumberOfMatchsResponse } from '../responses/GetPokemonsWithNumberOfMatchsResponse';
import { StatsServiceSdk } from './StatsServiceSdk';

export class StatsServiceSdkStub implements StatsServiceSdk {
  public async getMatchsAdayLast30Days(): Promise<GetMatchsAdayLast30DaysResponse> {
    throw new Error('Stub method "getMatchsAdayLast30Days" called. You should implement this method if you want to use it.');
  }
  public async getNumberOfMatchsByPokemon(_input: GetNumberOfMatchsByPokemonRequest): Promise<GetNumberOfMatchsByPokemonResponse> {
    throw new Error('Stub method "getNumberOfMatchsByPokemon" called. You should implement this method if you want to use it.');
  }
  public async getNumberOfVictoriesByPokemon(_input: GetNumberOfVictoriesByPokemonRequest): Promise<GetNumberOfVictoriesByPokemonResponse> {
    throw new Error('Stub method "getNumberOfVictoriesByPokemon" called. You should implement this method if you want to use it.');
  }
  public async getPokemonsWithNumberOfMatchs(): Promise<GetPokemonsWithNumberOfMatchsResponse> {
    throw new Error('Stub method "getPokemonsWithNumberOfMatchs" called. You should implement this method if you want to use it.');
  }
}
