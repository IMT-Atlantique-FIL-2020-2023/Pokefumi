import { HttpResponse } from '@oats-ts/openapi-http';
import { ArrayOfPokemons } from '../types/ArrayOfPokemons';

export type GetPokemonsWithNumberOfMatchsResponse = HttpResponse<ArrayOfPokemons, 200, 'application/json', undefined>;
