import express from 'express';

import * as routes from './routes/user.routes';

const app = express();
app.use(express.json());
routes.register(app);

export { app };
