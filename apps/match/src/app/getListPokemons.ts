import { NamedAPIResource, PokemonClient } from 'pokenode-ts';
import { Pokemon } from '@pokefumi/pokefumi-common';
import getPokemon from './getPokemon';

export default async function getListPokemons(): Promise<Pokemon[]> {
  const api = new PokemonClient();

  const listPokemons = await api.listPokemonSpecies();
  const namedPokemons = listPokemons.results as NamedAPIResource[];

  const pokemons: Pokemon[] = await Promise.all(await namedPokemons.map(async p => await getPokemon(p.name)));

  return pokemons;
}
