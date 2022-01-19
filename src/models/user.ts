import Deck from './deck';

export default interface User {
  id: number;
  name: string; //TODO doit être unique
  deck: Deck;
  statut: boolean; //true = online, false = outline
  score: number;
  password: string;
}

export interface User {
  id: number;
  username: string; //TODO doit être unique
  password: string;
  score: number;
}
