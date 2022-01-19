export type LabelTypePokemon =
  | 'flying'
  | 'poison'
  | 'ground'
  | 'rock'
  | 'bug'
  | 'ghost'
  | 'steel'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon'
  | 'dark'
  | 'fairy'
  | 'unknown'
  | 'shadow';

export interface TypePokemon {
  label: LabelTypePokemon;
  faiblesses: LabelTypePokemon[];
  resistances: LabelTypePokemon[];
}

export interface Pokemon {
  id: number;
  name: string;
  type: TypePokemon[]; //un pokemon peut avoir plusieurs types
}
