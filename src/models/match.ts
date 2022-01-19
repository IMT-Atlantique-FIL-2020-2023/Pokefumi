import Joueur from './joueur';

export default interface Match {
  status: Status; //état du match
  isPublic: boolean; //true =match ouvert à tous, false = match avec lien d'invitation direct
  joueur1: Joueur; //joueur propriétaire du match
  joueur2?: Joueur; //adversaire. Peut être null dans le cas d'un match public tant que personne n'ait rejoint
  gagnant?: number; //gagnant du duel
  round: Round[];
}

export enum Status {
  Opened = 'OPENED', //en attente
  Playing = 'PLAYING', //En cours
  Finished = 'FINISHED', //fini
}

export type StatutRound = 'STARTED' | 'FINISHED';

export type NumeroRound = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface Round {
  matchId: number;
  roundNumber: NumeroRound;
  pokemonPlayer1: string;
  pokemonPlayer2: string;
  status: StatutRound;
  winner: number;
}
