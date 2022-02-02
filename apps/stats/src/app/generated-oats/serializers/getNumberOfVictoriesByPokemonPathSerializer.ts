import { createPathSerializer, serializers } from '@oats-ts/openapi-parameter-serialization';
import { GetNumberOfVictoriesByPokemonPathParameters } from '../parameters/GetNumberOfVictoriesByPokemonPathParameters';
import { PokemonID } from '../types/PokemonID';

export const getNumberOfVictoriesByPokemonPathSerializer = createPathSerializer<GetNumberOfVictoriesByPokemonPathParameters>(
  '/pokemons/{id}/number-of-victories',
  { id: serializers.path.simple.primitive<PokemonID>({}) },
);
