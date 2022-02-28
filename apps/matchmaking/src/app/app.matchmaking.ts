import express from 'express';
import 'dotenv/config';
import * as routes from './routes/matchmaking.routes';

const app = express();
app.use(express.json());
routes.register(app);

export { app };
