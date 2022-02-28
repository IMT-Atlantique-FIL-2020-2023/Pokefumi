import express from 'express';

import * as routes from './routes/user.routes';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
routes.register(app);

export { app };
