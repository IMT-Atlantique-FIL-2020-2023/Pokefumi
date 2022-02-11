import { Model } from 'objection';
import { User } from './user';

export class Match extends Model {
  static get tableName() {
    return 'match';
  }

  static get relationMappings() {
    return {
      round: {
        relation: Model.HasManyRelation,
        modelClass: Round,
        join: {
          from: 'match.round',
          to: 'round.id',
        },
      },
      joueur1: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'match.joueur1',
          to: 'user.id',
        },
      },
      joueur2: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'match.joueur2',
          to: 'user.id',
        },
      },
    };
  }

  id?: number;
  status: Status; //état du match
  isPublic: boolean; //true =match ouvert à tous, false = match avec lien d'invitation direct
  joueur1: User; //joueur propriétaire du match
  joueur2?: User; //adversaire. Peut être null dans le cas d'un match public tant que personne n'ait rejoint
  gagnant?: number; //gagnant du duel
  round: Round[];
  createdAt: Date;
  updatedAt: Date;
}

export enum Status {
  Opened = 'OPENED', //en attente
  Playing = 'PLAYING', //En cours
  Finished = 'FINISHED', //fini
}

export type StatutRound = 'STARTED' | 'FINISHED';

export type NumeroRound = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export class Round extends Model {
  static get tableName() {
    return 'round';
  }

  static get relationMappings() {
    return {
      round: {
        relation: Model.BelongsToOneRelation,
        modelClass: Match,
        join: {
          from: 'round.matchId',
          to: 'match.id',
        },
      },
    };
  }

  id?: number;
  matchId: number;
  roundNumber: NumeroRound;
  pokemonPlayer1: string;
  pokemonPlayer2: string;
  status: StatutRound;
  winner: number;
}
