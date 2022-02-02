import { ArrayOfPokemons } from '../types/ArrayOfPokemons';

export function isArrayOfPokemons(input: any): input is ArrayOfPokemons {
  return Array.isArray(input);
}
