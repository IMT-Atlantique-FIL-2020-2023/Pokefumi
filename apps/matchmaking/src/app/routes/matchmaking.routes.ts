import * as express from 'express';
import * as MatchMakingController from '../controllers/matchmaking.controller';
import { validateRequest } from 'zod-express-middleware';
import { z } from 'zod';
import jwt from 'express-jwt';


import { CloseDtoSchema, CreateMatchSchema, DeckDtoSchema, MatchIdSchema } from '../controllers/matchmaking.controller';
export const register = async (app: express.Application) => {
  

  //récupérer la liste des matchs
  app.get('/matchs', async (req, res) => {
    res.status(200).json(await MatchMakingController.listMatchs());
  });

  app.put(
    '/matchs',
    validateRequest({
      params: MatchIdSchema,
      body: CreateMatchSchema,
    }),
    jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),
    async (req, res) => {
      res.status(200).json(await MatchMakingController.createMatch(req.body, req));
    },
  );

  //récupérer un match par son id
  app.get(
    '/matchs/:id',
    validateRequest({
      params: MatchIdSchema,
    }),
    async (req, res) => {
      const match_id = Number(req.params.id);
      res.status(200).json(await MatchMakingController.getMatchById(match_id));
    },
  );

  app.get('/matchs/invitation', async (req, res) => {
    res.status(200).json(await MatchMakingController.listInvitations(req));
  });

  //modifie le statut d'un match existant
  app.post(
    '/matchs/:id/join',
    validateRequest({
      params: MatchIdSchema,
      body: DeckDtoSchema,
    }),
    jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),
    async (req, res) => {
      const match_id = Number(req.params.id);
      res.status(200).json(await MatchMakingController.joinMatch(match_id, req.body));
    },
  );

  app.post(
    '/internal/matches/:id/close',
    validateRequest({
      params: MatchIdSchema,
      body: CloseDtoSchema,
    }),
    async (req, res) => {
      const match_id = Number(req.params.id);
      res.status(200).json(await MatchMakingController.closeMatch(match_id, req.body));
    },
  );
};
