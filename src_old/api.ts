import { NamedAPIResource, PokemonClient } from 'pokenode-ts';
import { Pokemon, TypePokemon, LabelTypePokemon } from './models/pokemon';

getListTypes();
getPokemons();

async function getListTypes() {
  const api = new PokemonClient();

  const listTypes = await api.listTypes();
  const namedTypes = listTypes.results as NamedAPIResource[];

  const types: TypePokemon[] = await Promise.all(
    await namedTypes
      .map(async t => await api.getTypeByName(t.name))
      .map(async t => {
        const typePokemon = await t;

        const type: TypePokemon = {
          label: typePokemon.name as LabelTypePokemon,
          faiblesses: typePokemon.damage_relations.double_damage_from.map(e => e.name) as LabelTypePokemon[],
          resistances: typePokemon.damage_relations.half_damage_from.map(e => e.name) as LabelTypePokemon[],
        };

        return type;
      }),
  );

  return types;
}

async function getPokemons() {
  const api = new PokemonClient();

  const listPokemons = await api.listPokemonSpecies();
  const namedPokemons = listPokemons.results as NamedAPIResource[];

  const pokemons: Pokemon[] = await Promise.all(
    await namedPokemons
      .map(async p => await api.getPokemonByName(p.name))
      .map(async p => {
        const namedPokemon = await p;
        const pokemon: Pokemon = {
          id: namedPokemon.id,
          name: namedPokemon.name,
          type: [],
        };
        console.log(namedPokemon.types.map(t => t.type));

        return pokemon;
      }),
  );
}
