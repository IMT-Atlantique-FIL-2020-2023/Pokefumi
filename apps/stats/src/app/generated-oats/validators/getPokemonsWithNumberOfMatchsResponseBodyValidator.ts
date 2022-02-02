import { arrayOfPokemonsTypeValidator } from './arrayOfPokemonsTypeValidator';

export const getPokemonsWithNumberOfMatchsResponseBodyValidator = { 200: { 'application/json': arrayOfPokemonsTypeValidator } } as const;
