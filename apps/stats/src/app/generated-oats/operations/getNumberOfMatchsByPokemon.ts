import { ClientAdapter, RawHttpRequest } from '@oats-ts/openapi-http';
import { GetNumberOfMatchsByPokemonRequest } from '../requests/GetNumberOfMatchsByPokemonRequest';
import { GetNumberOfMatchsByPokemonResponse } from '../responses/GetNumberOfMatchsByPokemonResponse';
import { getNumberOfMatchsByPokemonPathSerializer } from '../serializers/getNumberOfMatchsByPokemonPathSerializer';
import { getNumberOfMatchsByPokemonResponseBodyValidator } from '../validators/getNumberOfMatchsByPokemonResponseBodyValidator';

/**
 * Number of matchs for a specific pokemon
 *
 * Returns the number of matchs for a specific pokemon
 */
export async function getNumberOfMatchsByPokemon(
  input: GetNumberOfMatchsByPokemonRequest,
  configuration: ClientAdapter,
): Promise<GetNumberOfMatchsByPokemonResponse> {
  const path = await configuration.getPath(input, getNumberOfMatchsByPokemonPathSerializer);
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
  const responseBody = await configuration.getResponseBody(rawResponse, statusCode, mimeType, getNumberOfMatchsByPokemonResponseBodyValidator);
  const response = {
    mimeType,
    statusCode,
    headers: responseHeaders,
    body: responseBody,
  } as GetNumberOfMatchsByPokemonResponse;
  return response;
}
