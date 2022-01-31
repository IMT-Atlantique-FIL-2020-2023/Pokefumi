import { Deck } from '@pokefumi/pokefumi-common';

export default interface User {
  id: number;
  username: string; //TODO doit être unique
  deck?: Deck;
  statut?: boolean; //true = online, false = outline
  score: number;
  password: string;
}
