import { Model } from 'objection';
import { User } from './user';
import { Match } from './match';

/**
 * Une invitation correspond à un match
 */
export default class Invitation extends Model {
  static get tableName() {
    return 'invitation';
  }

  static get relationMappings() {
    return {
      joueur1: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'invitation.joueur1',
          to: 'user.id',
        },
      },
      joueur2: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'invitation.joueur2',
          to: 'user.id',
        },
      },
      match: {
        relation: Model.HasOneRelation,
        modelClass: Match,
        join: {
          from: 'invitation.match',
          to: 'match.id',
        },
      },
    };
  }

  id?: number;
  joueur1: User; //joueur qui a créé l'invitation
  joueur2: User; //joueur destinataire
  lienInvitation: string; //lien d'invitation HTTP
  match: Match; //pour accéder aux détails du Match et au statut
}
