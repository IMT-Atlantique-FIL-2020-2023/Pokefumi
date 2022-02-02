import { createPathSerializer, serializers } from '@oats-ts/openapi-parameter-serialization';
import { GetNumberOfMatchsByPokemonPathParameters } from '../parameters/GetNumberOfMatchsByPokemonPathParameters';
import { PokemonID } from '../types/PokemonID';

export const getNumberOfMatchsByPokemonPathSerializer = createPathSerializer<GetNumberOfMatchsByPokemonPathParameters>(
  '/pokemons/{id}/number-of-matchs',
  { id: serializers.path.simple.primitive<PokemonID>({}) },
);
