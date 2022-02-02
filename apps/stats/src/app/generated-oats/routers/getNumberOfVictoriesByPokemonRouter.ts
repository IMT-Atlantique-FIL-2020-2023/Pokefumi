import { ExpressToolkit } from '@oats-ts/openapi-express-server-adapter';
import { RawHttpResponse, ServerAdapter } from '@oats-ts/openapi-http';
import { NextFunction, Request, Response, Router } from 'express';
import { StatsServiceApi } from '../api/StatsServiceApi';
import { getNumberOfVictoriesByPokemonPathDeserializer } from '../deserializers/getNumberOfVictoriesByPokemonPathDeserializer';
import { GetNumberOfVictoriesByPokemonServerRequest } from '../requests/GetNumberOfVictoriesByPokemonServerRequest';

export const getNumberOfVictoriesByPokemonRouter: Router = Router().get(
  '/pokemons/:id/number-of-victories',
  async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const toolkit: ExpressToolkit = { request, response, next };
    const configuration: ServerAdapter<ExpressToolkit> = response.locals['__oats_configuration'];
    const api: StatsServiceApi<ExpressToolkit> = response.locals['__oats_api'];
    try {
      const path = await configuration.getPathParameters(toolkit, getNumberOfVictoriesByPokemonPathDeserializer);
      const typedRequest: GetNumberOfVictoriesByPokemonServerRequest = {
        path,
      };
      const typedResponse = await api.getNumberOfVictoriesByPokemon(typedRequest, toolkit);
      const rawResponse: RawHttpResponse = {
        headers: await configuration.getResponseHeaders(toolkit, typedResponse, undefined),
        statusCode: await configuration.getStatusCode(toolkit, typedResponse),
        body: await configuration.getResponseBody(toolkit, typedResponse),
      };
      return configuration.respond(toolkit, rawResponse);
    } catch (error) {
      configuration.handleError(toolkit, error);
      throw error;
    }
  },
);
