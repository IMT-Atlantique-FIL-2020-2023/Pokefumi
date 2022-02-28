import { HttpResponse } from '@oats-ts/openapi-http';
import { AppError } from '../types/AppError';

export type GetNumberOfVictoriesByPokemonResponse =
  | HttpResponse<
      {
        /**
         * Pokemon's id used in the request
         */
        id?: number;
        /**
         * Number of victories for this pokemon
         */
        numberOfVictories?: number;
      },
      200,
      'application/json',
      undefined
    >
  | HttpResponse<AppError[], 400, 'application/json', undefined>;
