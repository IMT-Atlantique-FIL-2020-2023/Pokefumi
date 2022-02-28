import { array, items, number, object, shape } from '@oats-ts/validators';

export const arrayOfPokemonsTypeValidator = array(
  items(
    object(
      shape({
        id: number(),
        numberOfMatchs: number(),
      }),
    ),
  ),
);
