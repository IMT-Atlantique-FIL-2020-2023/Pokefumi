import { ArrayOfRounds } from '../types/ArrayOfRounds';

export function isArrayOfRounds(input: any): input is ArrayOfRounds {
  return (
    Array.isArray(input) &&
    input.every((item: any) => item !== null && typeof item === 'object' && typeof item.date === 'string' && typeof item.numberOfRounds === 'number')
  );
}
