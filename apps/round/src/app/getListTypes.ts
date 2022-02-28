import { NamedAPIResource, PokemonClient } from 'pokenode-ts';
import { TypePokemon } from '@pokefumi/pokefumi-common';
import { getTypeByName } from './getType';

export default async function getListTypes(): Promise<TypePokemon[]> {
  const api = new PokemonClient();

  const listTypes = await api.listTypes();
  const namedTypes = listTypes.results as NamedAPIResource[];

  const types: TypePokemon[] = await Promise.all(await namedTypes.map(async t => await getTypeByName(t.name)));

  return types;
}
