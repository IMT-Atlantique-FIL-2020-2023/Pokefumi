import { PokemonClient } from 'pokenode-ts';
import { Pokemon, TypePokemon } from '@pokefumi/pokefumi-common';
import { getTypeByName } from './getType';

export async function getPokemon(id: number): Promise<Pokemon> {
  const api = new PokemonClient();

  const pokemon = await api.getPokemonById(id);

  return buildTypesPokemon(pokemon);
}

export async function getPokemonByName(name: string): Promise<Pokemon> {
  const api = new PokemonClient();

  const namedPokemon = await api.getPokemonByName(name);

  return buildTypesPokemon(namedPokemon);
}

async function buildTypesPokemon(namedPokemon: any): Promise<Pokemon> {
  const types: TypePokemon[] = await Promise.all(
    namedPokemon.types.map(async (e: any) => {
      return await getTypeByName(e.type.name);
    }),
  );

  const pokemon: Pokemon = {
    id: namedPokemon.id,
    name: namedPokemon.name,
    types: types as TypePokemon[],
  } as Pokemon;

  return pokemon;
}
