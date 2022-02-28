import { Router } from 'express';

export type StatsServiceRouters = {
  getNumberOfRoundsByPokemonRouter: Router;
  getNumberOfVictoriesByPokemonRouter: Router;
  getPokemonsWithNumberOfRoundsRouter: Router;
  getRoundsAdayLast30DaysRouter: Router;
  uploadStatRowRouter: Router;
};
