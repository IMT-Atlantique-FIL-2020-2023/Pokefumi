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

export class TypePokemon  {

  id?: number;
  label: LabelTypePokemon;
  faiblesses: LabelTypePokemon[];
  resistances: LabelTypePokemon[];
}

export class Pokemon{
  id?: number;
  name: string;
  types: TypePokemon[]; //un pokemon peut avoir plusieurs types
} 
