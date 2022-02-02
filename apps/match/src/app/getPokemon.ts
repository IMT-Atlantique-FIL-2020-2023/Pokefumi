import { PokemonClient } from 'pokenode-ts';
import { Pokemon, TypePokemon } from '@pokefumi/pokefumi-common';
import e from 'express';
import getType from './getType';

export default async function getPokemon(name: string): Promise<Pokemon> {
  const api = new PokemonClient();

  const namedPokemon = await api.getPokemonByName(name);

  const types: TypePokemon[] = await Promise.all(
    namedPokemon.types.map(async (e: any) => {
      return await getType(e.type.name);
    }),
  );

  const pokemon: Pokemon = {
    id: namedPokemon.id,
    name: namedPokemon.name,
    types: types as TypePokemon[],
  } as Pokemon;

  return pokemon;
}
