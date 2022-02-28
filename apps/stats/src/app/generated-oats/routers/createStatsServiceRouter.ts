import { ExpressToolkit } from '@oats-ts/openapi-express-server-adapter';
import { ServerAdapter } from '@oats-ts/openapi-http';
import { Router } from 'express';
import { StatsServiceApi } from '../api/StatsServiceApi';
import { getNumberOfRoundsByPokemonRouter } from './getNumberOfRoundsByPokemonRouter';
import { getNumberOfVictoriesByPokemonRouter } from './getNumberOfVictoriesByPokemonRouter';
import { getPokemonsWithNumberOfRoundsRouter } from './getPokemonsWithNumberOfRoundsRouter';
import { getRoundsAdayLast30DaysRouter } from './getRoundsAdayLast30DaysRouter';
import { StatsServiceRouters } from './StatsServiceRouters';
import { uploadStatRowRouter } from './uploadStatRowRouter';

export function createStatsServiceRouter(
  api: StatsServiceApi<ExpressToolkit>,
  configuration: ServerAdapter<ExpressToolkit>,
  routes: Partial<StatsServiceRouters> = {},
): Router {
  return Router().use(
    (_, response, next) => {
      response.locals['__oats_api'] = api;
      response.locals['__oats_configuration'] = configuration;
      next();
    },
    routes.getNumberOfRoundsByPokemonRouter ?? getNumberOfRoundsByPokemonRouter,
    routes.getNumberOfVictoriesByPokemonRouter ?? getNumberOfVictoriesByPokemonRouter,
    routes.getPokemonsWithNumberOfRoundsRouter ?? getPokemonsWithNumberOfRoundsRouter,
    routes.getRoundsAdayLast30DaysRouter ?? getRoundsAdayLast30DaysRouter,
    routes.uploadStatRowRouter ?? uploadStatRowRouter,
  );
}
