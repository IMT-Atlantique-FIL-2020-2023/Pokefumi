import * as express from 'express';
import * as MatchMakingController from '../controllers/matchmaking.controller';
//import { User } from '@pokefumi/pokefumi-common';

export const register = async (app: express.Application) => {
  app.get('/matchs', async (req, res) => {
    res.status(200).json(await MatchMakingController.listMatchs());
  });
};
