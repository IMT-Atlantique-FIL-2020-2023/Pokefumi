import Deck from '../../../src_old/models/deck';

export default interface User {
  id: number;
  username: string; //TODO doit être unique
  deck?: Deck;
  statut?: boolean; //true = online, false = outline
  score: number;
  password: string;
}
