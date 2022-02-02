import { arrayOfMatchesTypeValidator } from './arrayOfMatchesTypeValidator';

export const getMatchsAdayLast30DaysResponseBodyValidator = { 200: { 'application/json': arrayOfMatchesTypeValidator } } as const;
