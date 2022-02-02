import { createPathDeserializer, deserializers } from '@oats-ts/openapi-parameter-deserialization';
import { GetNumberOfVictoriesByPokemonPathParameters } from '../parameters/GetNumberOfVictoriesByPokemonPathParameters';

export const getNumberOfVictoriesByPokemonPathDeserializer = createPathDeserializer<GetNumberOfVictoriesByPokemonPathParameters>(
  ['id'],
  /^\/pokemons(?:\/([^\/#\?]+?))\/number-of-victories[\/#\?]?$/i,
  { id: deserializers.path.simple.primitive(deserializers.value.number(), {}) },
);
