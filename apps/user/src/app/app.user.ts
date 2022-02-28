import express from 'express';

import * as routes from './routes/user.routes';
const cors = require('cors');

const app = express();
app.use(express.json());
routes.register(app);
app.use(cors());

export { app };
