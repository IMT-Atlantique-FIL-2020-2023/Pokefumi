import { HttpResponse } from '@oats-ts/openapi-http';

export type GetNumberOfMatchsByPokemonResponse = HttpResponse<
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
>;
