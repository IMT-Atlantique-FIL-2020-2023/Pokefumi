import { Router } from 'express';

export type StatsServiceRouters = {
  getMatchsAdayLast30DaysRouter: Router;
  getNumberOfMatchsByPokemonRouter: Router;
  getNumberOfVictoriesByPokemonRouter: Router;
  getPokemonsWithNumberOfMatchsRouter: Router;
};
