import { ClientAdapter, RawHttpRequest } from '@oats-ts/openapi-http';
import { GetPokemonsWithNumberOfMatchsResponse } from '../responses/GetPokemonsWithNumberOfMatchsResponse';
import { getPokemonsWithNumberOfMatchsResponseBodyValidator } from '../validators/getPokemonsWithNumberOfMatchsResponseBodyValidator';

/**
 * List of pokemons with their number of matchs
 *
 * Returns the list of pokemons with their number of matchs
 */
export async function getPokemonsWithNumberOfMatchs(configuration: ClientAdapter): Promise<GetPokemonsWithNumberOfMatchsResponse> {
  const requestUrl = await configuration.getUrl('/pokemons/matchs', undefined);
  const requestHeaders = await configuration.getRequestHeaders(undefined, undefined);
  const rawRequest: RawHttpRequest = {
    url: requestUrl,
    method: 'get',
    headers: requestHeaders,
  };
  const rawResponse = await configuration.request(rawRequest);
  const mimeType = await configuration.getMimeType(rawResponse);
  const statusCode = await configuration.getStatusCode(rawResponse);
  const responseHeaders = await configuration.getResponseHeaders(rawResponse, statusCode, undefined);
  const responseBody = await configuration.getResponseBody(rawResponse, statusCode, mimeType, getPokemonsWithNumberOfMatchsResponseBodyValidator);
  const response = {
    mimeType,
    statusCode,
    headers: responseHeaders,
    body: responseBody,
  } as GetPokemonsWithNumberOfMatchsResponse;
  return response;
}
