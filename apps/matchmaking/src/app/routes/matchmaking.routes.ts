import * as express from 'express';
import * as MatchMakingController from '../controllers/matchmaking.controller';
import { Match } from '@pokefumi/pokefumi-common';

export const register = async (app: express.Application) => {
  app.get('/matchs', async (req, res) => {
    res.status(200).json(await MatchMakingController.listMatchs());
  });

  app.get('/matchs/:id', async (req, res) => {
    const match_id = Number(req.params.id);
    res.status(200).json(await MatchMakingController.getMatchById(match_id));
  });

  app.put('/matchs/:id/status/:status', async (req, res) => {
    const match_id = Number(req.params.id);
    const status: string = req.params.status;
    res.status(200).json(await MatchMakingController.setStatus(match_id, status));
  });
  /*
  app.put('/matchs/:id/joueur2/:idJoueur2', async (req, res) => {
    const match_id = Number(req.params.id);
    const idJoueur2 = req.params.idJoueur2;
    res.status(200).json(await MatchMakingController.setJoueur2(match_id, idJoueur2));
  });

  app.put('/matchs/:id/gagnant/:idGagnant', async (req, res) => {
    const match_id = Number(req.params.id);
    const gagnant = req.params.idGagnant;
    res.status(200).json(await MatchMakingController.setGagnant(match_id, gagnant));
  });

  app.post('/matchs', async (req, res) => {
    const newMatch: Match = req.body;
    const result = await MatchMakingController.addMatch(newMatch);
    result ? res.status(200).json(result) : res.status(409).json('could not insert match. Check the body of your request.');
  });*/
};
