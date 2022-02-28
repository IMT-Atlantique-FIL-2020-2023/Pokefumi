import { ArrayOfPokemons } from '../types/ArrayOfPokemons';

export function isArrayOfPokemons(input: any): input is ArrayOfPokemons {
  return (
    Array.isArray(input) &&
    input.every((item: any) => item !== null && typeof item === 'object' && typeof item.id === 'number' && typeof item.numberOfRounds === 'number')
  );
}
