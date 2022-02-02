import { number, object, optional, shape } from '@oats-ts/validators';

export const getNumberOfVictoriesByPokemonResponseBodyValidator = {
  200: {
    'application/json': object(
      shape({
        id: optional(number()),
        numberOfVictories: optional(number()),
      }),
    ),
  },
} as const;
