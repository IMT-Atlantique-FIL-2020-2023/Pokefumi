import express from 'express';
import * as bodyParser from 'body-parser';

import * as routes from './routes';

const app = express();
app.use(express.json());
routes.register(app);

export { app };
