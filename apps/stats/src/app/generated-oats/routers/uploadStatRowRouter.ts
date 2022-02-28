import { ExpressToolkit } from '@oats-ts/openapi-express-server-adapter';
import { RawHttpResponse, ServerAdapter } from '@oats-ts/openapi-http';
import { NextFunction, Request, Response, Router } from 'express';
import { StatsServiceApi } from '../api/StatsServiceApi';
import { UploadStatRowServerRequest } from '../requests/UploadStatRowServerRequest';
import { StatsDto } from '../types/StatsDto';
import { uploadStatRowRequestBodyValidator } from '../validators/uploadStatRowRequestBodyValidator';

export const uploadStatRowRouter: Router = Router().put('/stats', async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const toolkit: ExpressToolkit = { request, response, next };
  const configuration: ServerAdapter<ExpressToolkit> = response.locals['__oats_configuration'];
  const api: StatsServiceApi<ExpressToolkit> = response.locals['__oats_api'];
  try {
    const mimeType = await configuration.getMimeType<'application/json'>(toolkit);
    const body = await configuration.getRequestBody<'application/json', StatsDto>(toolkit, mimeType, uploadStatRowRequestBodyValidator);
    const typedRequest: UploadStatRowServerRequest = {
      mimeType,
      body,
    };
    const typedResponse = await api.uploadStatRow(typedRequest, toolkit);
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
});
