import { ExpressToolkit } from '@oats-ts/openapi-express-server-adapter';
import { ServerAdapter } from '@oats-ts/openapi-http';
import { Router } from 'express';
import { StatsServiceApi } from '../api/StatsServiceApi';
import { getMatchsAdayLast30DaysRouter } from './getMatchsAdayLast30DaysRouter';
import { getNumberOfMatchsByPokemonRouter } from './getNumberOfMatchsByPokemonRouter';
import { getNumberOfVictoriesByPokemonRouter } from './getNumberOfVictoriesByPokemonRouter';
import { getPokemonsWithNumberOfMatchsRouter } from './getPokemonsWithNumberOfMatchsRouter';
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
    routes.getMatchsAdayLast30DaysRouter ?? getMatchsAdayLast30DaysRouter,
    routes.getNumberOfMatchsByPokemonRouter ?? getNumberOfMatchsByPokemonRouter,
    routes.getNumberOfVictoriesByPokemonRouter ?? getNumberOfVictoriesByPokemonRouter,
    routes.getPokemonsWithNumberOfMatchsRouter ?? getPokemonsWithNumberOfMatchsRouter,
    routes.uploadStatRowRouter ?? uploadStatRowRouter,
  );
}
