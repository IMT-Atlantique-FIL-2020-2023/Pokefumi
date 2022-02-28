import { array, items, number, object, shape, string } from '@oats-ts/validators';

export const arrayOfRoundsTypeValidator = array(
  items(
    object(
      shape({
        date: string(),
        numberOfRounds: number(),
      }),
    ),
  ),
);
