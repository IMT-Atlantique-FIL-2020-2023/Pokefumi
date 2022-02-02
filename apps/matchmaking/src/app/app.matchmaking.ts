import express from 'express';

import * as routes from './routes/matchmaking.routes';

const app = express();
app.use(express.json());
routes.register(app);

export { app };
