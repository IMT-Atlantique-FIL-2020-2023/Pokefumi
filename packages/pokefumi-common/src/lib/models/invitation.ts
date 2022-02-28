import { User } from './user';
import { Match } from './match';

/**
 * Une invitation correspond à un match
 */
export default class Invitation {
  id?: number;
  joueur1: User; //joueur qui a créé l'invitation
  joueur2: User; //joueur destinataire
  lienInvitation: string; //lien d'invitation HTTP
  match: Match; //pour accéder aux détails du Match et au statut
}
