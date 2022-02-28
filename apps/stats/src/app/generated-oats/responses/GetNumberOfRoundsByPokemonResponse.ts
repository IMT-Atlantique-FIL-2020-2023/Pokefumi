import { HttpResponse } from '@oats-ts/openapi-http';
import { AppError } from '../types/AppError';

export type GetNumberOfRoundsByPokemonResponse =
  | HttpResponse<
      {
        /**
         * Pokemon's id used in the request
         */
        id?: number;
        /**
         * Number of rounds for this pokemon
         */
        numberOfRounds?: number;
      },
      200,
      'application/json',
      undefined
    >
  | HttpResponse<AppError[], 400, 'application/json', undefined>;
