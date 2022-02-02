import { HasPathParameters } from '@oats-ts/openapi-http';
import { Try } from '@oats-ts/try';
import { GetNumberOfVictoriesByPokemonPathParameters } from '../parameters/GetNumberOfVictoriesByPokemonPathParameters';

export type GetNumberOfVictoriesByPokemonServerRequest = HasPathParameters<Try<GetNumberOfVictoriesByPokemonPathParameters>>;
