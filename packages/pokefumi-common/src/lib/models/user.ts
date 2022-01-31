import { Model } from 'objection';
import { Deck } from './deck';

export default class User extends Model {
  static get tableName() {
    return 'user';
  }

  static get relationMappings() {
    return {
      pokemons: {
        relation: Model.HasOneRelation,
        modelClass: Deck,
        join: {
          from: 'deck.deck',
          to: 'deck.id',
        },
      },
    };
  }

  id?: number;
  username: string; //TODO doit être unique
  deck?: Deck;
  statut?: boolean; //true = online, false = outline
  score: number;
  password: string;
}
