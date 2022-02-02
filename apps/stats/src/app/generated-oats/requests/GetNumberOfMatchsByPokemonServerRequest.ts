import { HasPathParameters } from '@oats-ts/openapi-http';
import { Try } from '@oats-ts/try';
import { GetNumberOfMatchsByPokemonPathParameters } from '../parameters/GetNumberOfMatchsByPokemonPathParameters';

export type GetNumberOfMatchsByPokemonServerRequest = HasPathParameters<Try<GetNumberOfMatchsByPokemonPathParameters>>;
