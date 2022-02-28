import { HasPathParameters } from '@oats-ts/openapi-http';
import { Try } from '@oats-ts/try';
import { GetNumberOfRoundsByPokemonPathParameters } from '../parameters/GetNumberOfRoundsByPokemonPathParameters';

export type GetNumberOfRoundsByPokemonServerRequest = HasPathParameters<Try<GetNumberOfRoundsByPokemonPathParameters>>;
