import { PokemonID } from '../types/PokemonID';

export function isPokemonId(input: any): input is PokemonID {
  return typeof input === 'number';
}
