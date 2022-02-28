import { Deck } from './deck';

export class User {



  id?: number;
  username: string; //TODO doit être unique
  deck?: Deck;
  statut?: boolean; //true = online, false = outline
  score: number;
  password: string;
}
