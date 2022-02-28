import { boolean, number, object, shape, string } from '@oats-ts/validators';

export const statsDtoTypeValidator = object(
  shape({
    dateMatch: string(),
    idMatch: number(),
    idPokemon: number(),
    team: number(),
    victory: boolean(),
  }),
);
