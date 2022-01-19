import Deck from './deck';

export default interface Joueur {
  id: number;
  name: string; //TODO doit être unique
  deck: Deck;
  statut: boolean; //true = online, false = outline
  score: number;
  password: string;
}
