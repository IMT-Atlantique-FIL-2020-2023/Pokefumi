import { createPathDeserializer, deserializers } from '@oats-ts/openapi-parameter-deserialization';
import { GetNumberOfRoundsByPokemonPathParameters } from '../parameters/GetNumberOfRoundsByPokemonPathParameters';

export const getNumberOfRoundsByPokemonPathDeserializer = createPathDeserializer<GetNumberOfRoundsByPokemonPathParameters>(
  ['id'],
  /^\/pokemons(?:\/([^\/#\?]+?))\/number-of-rounds[\/#\?]?$/i,
  { id: deserializers.path.simple.primitive(deserializers.value.number(), {}) },
);
