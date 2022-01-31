import { Model } from 'objection';
import { Pokemon } from './pokemon';

export default class Deck extends Model {
  static get tableName() {
    return 'deck';
  }

  static get relationMappings() {
    return {
      pokemons: {
        relation: Model.ManyToManyRelation,
        modelClass: Pokemon,
        join: {
          from: 'deck.pokemons',
          to: 'pokemon.id',
        },
      },
    };
  }

  userId?: number;
  id?: number;
  name: string;
  pokemons: Pokemon[];
}
