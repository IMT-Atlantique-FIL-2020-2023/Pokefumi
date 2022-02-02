import { ClientAdapter, RawHttpRequest } from '@oats-ts/openapi-http';
import { GetMatchsAdayLast30DaysResponse } from '../responses/GetMatchsAdayLast30DaysResponse';
import { getMatchsAdayLast30DaysResponseBodyValidator } from '../validators/getMatchsAdayLast30DaysResponseBodyValidator';

/**
 * Number of matchs a day for the last 30 days
 */
export async function getMatchsAdayLast30Days(configuration: ClientAdapter): Promise<GetMatchsAdayLast30DaysResponse> {
  const requestUrl = await configuration.getUrl('/matchs/count-a-day-last-30-days', undefined);
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
  const responseBody = await configuration.getResponseBody(rawResponse, statusCode, mimeType, getMatchsAdayLast30DaysResponseBodyValidator);
  const response = {
    mimeType,
    statusCode,
    headers: responseHeaders,
    body: responseBody,
  } as GetMatchsAdayLast30DaysResponse;
  return response;
}
