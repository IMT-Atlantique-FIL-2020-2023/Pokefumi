import { ArrayOfMatches } from '../types/ArrayOfMatches';

export function isArrayOfMatches(input: any): input is ArrayOfMatches {
  return Array.isArray(input);
}
