import { array, items, number, object, optional, shape, string } from '@oats-ts/validators';

export const arrayOfMatchesTypeValidator = array(
  items(
    object(
      shape({
        date: optional(string()),
        numberOfMatches: optional(number()),
      }),
    ),
  ),
);
