import express, { Request, Response, NextFunction } from 'express';
import * as routes from './routes/matchmaking.routes';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use((err: ResponseError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).send({ status: 404, message: err.message }); // Bad request
  }
  next();
});
interface ResponseError extends Error {
  status?: number;
}

app.use(cors());
routes.register(app);

export { app };
