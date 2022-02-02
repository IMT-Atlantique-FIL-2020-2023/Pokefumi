import { ClientAdapter, RawHttpRequest } from '@oats-ts/openapi-http';
import { GetNumberOfVictoriesByPokemonRequest } from '../requests/GetNumberOfVictoriesByPokemonRequest';
import { GetNumberOfVictoriesByPokemonResponse } from '../responses/GetNumberOfVictoriesByPokemonResponse';
import { getNumberOfVictoriesByPokemonPathSerializer } from '../serializers/getNumberOfVictoriesByPokemonPathSerializer';
import { getNumberOfVictoriesByPokemonResponseBodyValidator } from '../validators/getNumberOfVictoriesByPokemonResponseBodyValidator';

/**
 * Number of victories for a specific pokemon
 *
 * Returns the number of victories for a specific pokemon
 */
export async function getNumberOfVictoriesByPokemon(
  input: GetNumberOfVictoriesByPokemonRequest,
  configuration: ClientAdapter,
): Promise<GetNumberOfVictoriesByPokemonResponse> {
  const path = await configuration.getPath(input, getNumberOfVictoriesByPokemonPathSerializer);
  const requestUrl = await configuration.getUrl(path, undefined);
  const requestHeaders = await configuration.getRequestHeaders(input, undefined);
  const rawRequest: RawHttpRequest = {
    url: requestUrl,
    method: 'get',
    headers: requestHeaders,
  };
  const rawResponse = await configuration.request(rawRequest);
  const mimeType = await configuration.getMimeType(rawResponse);
  const statusCode = await configuration.getStatusCode(rawResponse);
  const responseHeaders = await configuration.getResponseHeaders(rawResponse, statusCode, undefined);
  const responseBody = await configuration.getResponseBody(rawResponse, statusCode, mimeType, getNumberOfVictoriesByPokemonResponseBodyValidator);
  const response = {
    mimeType,
    statusCode,
    headers: responseHeaders,
    body: responseBody,
  } as GetNumberOfVictoriesByPokemonResponse;
  return response;
}
