/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ExpressServerConfiguration } from '@oats-ts/openapi-http-server/lib/express';
import express from 'express';
import { createStatsServiceRouter } from './app/generated-oats/routers/createStatsServiceRouter';
import { statsServiceCorsMiddleware } from './app/generated-oats/routers/statsServiceCorsMiddleware';
import { StatsApiImpl } from './app/StatsApiImpl';

const app = express();
app.use(express.json());
app.use(statsServiceCorsMiddleware('*'));
app.use(createStatsServiceRouter(new StatsApiImpl(), new ExpressServerConfiguration()));

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
