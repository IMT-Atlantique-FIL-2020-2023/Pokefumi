import { Pokemon } from './pokemon';

export default interface Deck {
  id: number;
  name: string;
  pokemons: Pokemon[];
}
