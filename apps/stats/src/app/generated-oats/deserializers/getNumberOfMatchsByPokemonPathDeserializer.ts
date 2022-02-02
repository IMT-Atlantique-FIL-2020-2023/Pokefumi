import { createPathDeserializer, deserializers } from '@oats-ts/openapi-parameter-deserialization';
import { GetNumberOfMatchsByPokemonPathParameters } from '../parameters/GetNumberOfMatchsByPokemonPathParameters';

export const getNumberOfMatchsByPokemonPathDeserializer = createPathDeserializer<GetNumberOfMatchsByPokemonPathParameters>(
  ['id'],
  /^\/pokemons(?:\/([^\/#\?]+?))\/number-of-matchs[\/#\?]?$/i,
  { id: deserializers.path.simple.primitive(deserializers.value.number(), {}) },
);
