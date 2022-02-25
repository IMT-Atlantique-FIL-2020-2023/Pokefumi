import { array, items, number, object, optional, shape } from '@oats-ts/validators';

export const arrayOfPokemonsTypeValidator = array(
  items(
    object(
      shape({
        id: optional(number()),
        numberOfMatchs: optional(number()),
      }),
    ),
  ),
);
