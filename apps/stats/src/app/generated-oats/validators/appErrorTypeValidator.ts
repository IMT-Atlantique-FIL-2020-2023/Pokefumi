import { number, object, shape, string } from '@oats-ts/validators';

export const appErrorTypeValidator = object(
  shape({
    code: number(),
    message: string(),
  }),
);
