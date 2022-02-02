import { number, object, optional, shape } from '@oats-ts/validators';

export const getNumberOfMatchsByPokemonResponseBodyValidator = {
  200: {
    'application/json': object(
      shape({
        id: optional(number()),
        numberOfMatchs: optional(number()),
      }),
    ),
  },
} as const;
