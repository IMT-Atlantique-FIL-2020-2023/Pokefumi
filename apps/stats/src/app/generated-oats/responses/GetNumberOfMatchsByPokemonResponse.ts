import { HttpResponse } from '@oats-ts/openapi-http';
import { AppError } from '../types/AppError';

export type GetNumberOfMatchsByPokemonResponse =
  | HttpResponse<
      {
        /**
         * Pokemon's id used in the request
         */
        id?: number;
        /**
         * Number of matchs for this pokemon
         */
        numberOfMatchs?: number;
      },
      200,
      'application/json',
      undefined
    >
  | HttpResponse<AppError[], 400, 'application/json', undefined>;
