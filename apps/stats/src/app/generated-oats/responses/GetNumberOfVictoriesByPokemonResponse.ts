import { HttpResponse } from '@oats-ts/openapi-http';

export type GetNumberOfVictoriesByPokemonResponse = HttpResponse<
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
>;
