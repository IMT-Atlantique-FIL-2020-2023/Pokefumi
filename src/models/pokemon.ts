import { Model } from 'objection';

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

export class TypePokemon extends Model {
  static get tableName() {
    return 'type_pokemon';
  }

  id?: number;
  label: LabelTypePokemon;
  faiblesses: LabelTypePokemon[];
  resistances: LabelTypePokemon[];
}

export class Pokemon extends Model {
  static get tableName() {
    return 'pokemon';
  }

  static get relationMappings() {
    return {
      type: {
        relation: Model.ManyToManyRelation,
        modelClass: TypePokemon,
        join: {
          from: 'pokemon.type',
          to: 'type_pokemon.id',
        },
      },
    };
  }

  id?: number;
  name: string;
  type: TypePokemon[]; //un pokemon peut avoir plusieurs types
}
