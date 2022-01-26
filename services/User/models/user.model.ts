import Deck from '../../../src/models/deck';

export default interface User {
  id: number;
  name: string; //TODO doit être unique
  deck?: Deck;
  statut?: boolean; //true = online, false = outline
  score: number;
  password: string;
}
