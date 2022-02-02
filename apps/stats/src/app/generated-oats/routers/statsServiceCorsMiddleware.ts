import { NextFunction, Request, RequestHandler, Response } from 'express';

export const statsServiceCorsMiddleware =
  (...origins: string[]): RequestHandler =>
  (request: Request, response: Response, next: NextFunction) => {
    if (typeof request.headers.origin === 'string' && (origins.indexOf(request.headers.origin) >= 0 || origins.indexOf('*') >= 0)) {
      response.setHeader('Access-Control-Allow-Origin', request.headers.origin);
      response.setHeader('Access-Control-Allow-Methods', 'GET');
      response.setHeader('Access-Control-Allow-Headers', 'content-type');
    }
    next();
  };
