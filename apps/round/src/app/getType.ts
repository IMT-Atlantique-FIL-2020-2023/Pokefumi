import { PokemonClient } from 'pokenode-ts';
import { TypePokemon, LabelTypePokemon } from '@pokefumi/pokefumi-common';

export async function getType(id: number): Promise<TypePokemon> {
  const api = new PokemonClient();

  const pokemon = await api.getTypeById(id);

  return buildTypePokemon(pokemon);
}

export async function getTypeByName(name: string): Promise<TypePokemon> {
  const api = new PokemonClient();

  const pokemon = await api.getTypeByName(name);

  return buildTypePokemon(pokemon);
}

async function buildTypePokemon(pokemon: any): Promise<TypePokemon> {
  const type: TypePokemon = {
    label: pokemon.name as LabelTypePokemon,
    faiblesses: pokemon.damage_relations.double_damage_from.map((e: any) => e.name) as LabelTypePokemon[],
    resistances: pokemon.damage_relations.half_damage_from.map((e: any) => e.name) as LabelTypePokemon[],
  } as TypePokemon;

  return type;
}
