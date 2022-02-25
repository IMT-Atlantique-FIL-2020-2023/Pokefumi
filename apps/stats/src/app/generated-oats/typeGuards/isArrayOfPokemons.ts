import { ArrayOfPokemons } from '../types/ArrayOfPokemons';

export function isArrayOfPokemons(input: any): input is ArrayOfPokemons {
  return (
    Array.isArray(input) &&
    input.every(
      (item: any) =>
        item !== null &&
        typeof item === 'object' &&
        (item.id === null || item.id === undefined || typeof item.id === 'number') &&
        (item.numberOfMatchs === null || item.numberOfMatchs === undefined || typeof item.numberOfMatchs === 'number'),
    )
  );
}
