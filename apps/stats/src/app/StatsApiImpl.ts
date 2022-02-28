import { ExpressParameters } from '@oats-ts/openapi-http-server/lib/express';
import { fluent } from '@oats-ts/try';
import { StatsServiceApi } from './generated-oats/api/StatsServiceApi';
import { GetNumberOfMatchsByPokemonServerRequest } from './generated-oats/requests/GetNumberOfMatchsByPokemonServerRequest';
import { GetNumberOfVictoriesByPokemonServerRequest } from './generated-oats/requests/GetNumberOfVictoriesByPokemonServerRequest';
import { GetMatchsAdayLast30DaysResponse } from './generated-oats/responses/GetMatchsAdayLast30DaysResponse';
import { GetNumberOfMatchsByPokemonResponse } from './generated-oats/responses/GetNumberOfMatchsByPokemonResponse';
import { GetNumberOfVictoriesByPokemonResponse } from './generated-oats/responses/GetNumberOfVictoriesByPokemonResponse';
import { GetPokemonsWithNumberOfMatchsResponse } from './generated-oats/responses/GetPokemonsWithNumberOfMatchsResponse';
import { Match } from '@pokefumi/pokefumi-api';

export class StatsApiImpl implements StatsServiceApi<ExpressParameters> {
  async getMatchsAdayLast30Days(toolkit: ExpressParameters): Promise<GetMatchsAdayLast30DaysResponse> {
    return null;
  }
  async getNumberOfMatchsByPokemon(
    request: GetNumberOfMatchsByPokemonServerRequest,
    toolkit: ExpressParameters,
  ): Promise<GetNumberOfMatchsByPokemonResponse> {
    return null;
  }

  async getNumberOfVictoriesByPokemon(
    request: GetNumberOfVictoriesByPokemonServerRequest,
    toolkit: ExpressParameters,
  ): Promise<GetNumberOfVictoriesByPokemonResponse> {
    return { body: { id: 4, numberOfVictories: 5 }, statusCode: 200, headers: undefined, mimeType: 'application/json' };
  }
  async getPokemonsWithNumberOfMatchs(toolkit: ExpressParameters): Promise<GetPokemonsWithNumberOfMatchsResponse> {
    throw new Error('Method not implemented.');
  }
}
