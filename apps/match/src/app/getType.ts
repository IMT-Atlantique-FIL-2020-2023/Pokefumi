import { PokemonClient } from 'pokenode-ts';
import { TypePokemon, LabelTypePokemon } from '@pokefumi/pokefumi-common';

export default async function getType(name: string): Promise<TypePokemon> {
  const api = new PokemonClient();

  const typePokemon = await api.getTypeByName(name);

  const type: TypePokemon = {
    label: typePokemon.name as LabelTypePokemon,
    faiblesses: typePokemon.damage_relations.double_damage_from.map(e => e.name) as LabelTypePokemon[],
    resistances: typePokemon.damage_relations.half_damage_from.map(e => e.name) as LabelTypePokemon[],
  } as TypePokemon;

  return type;
}
