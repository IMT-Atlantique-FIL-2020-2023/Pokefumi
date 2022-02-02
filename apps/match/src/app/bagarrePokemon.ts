import getPokemon from './getPokemon';
import { Pokemon } from '@pokefumi/pokefumi-common';

export default async function bagarrePokemon(name1: string, name2: string): Promise<Pokemon> {
  const pokemon1: Pokemon = await getPokemon(name1);
  const pokemon2: Pokemon = await getPokemon(name2);

  let score: number = 0;

  const resistances1: Set<string>[] = pokemon1.types.map(e => new Set(e.resistances));
  const faiblesses1: Set<string>[] = pokemon1.types.map(e => new Set(e.faiblesses));

  const resistances2: Set<string>[] = pokemon2.types.map(e => new Set(e.resistances));
  const faiblesses2: Set<string>[] = pokemon2.types.map(e => new Set(e.faiblesses));

  for (const i in pokemon1.types) {
    const type1: string = pokemon1.types[i].label;
    const res1: Set<string> = resistances1[i];
    const fai1: Set<string> = faiblesses1[i];

    for (const j in pokemon2.types) {
      const type2: string = pokemon2.types[j].label;
      const res2: Set<string> = resistances2[j];
      const fai2: Set<string> = faiblesses2[j];

      if (res1.has(type2)) score++;
      if (fai1.has(type2)) score--;

      if (res2.has(type1)) score--;
      if (fai2.has(type1)) score++;
    }
  }

  if (score === 0) return {} as Pokemon;

  return score > 1 ? pokemon1 : pokemon2;
}
