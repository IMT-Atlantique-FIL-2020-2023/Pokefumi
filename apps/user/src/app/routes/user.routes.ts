import * as express from 'express';
import * as UserController from '../controllers/user.controller';
import { User } from '@prisma/client/user';
export const register = async (app: express.Application) => {
  app.get('/users', async (req, res) => {
    res.status(200).json(await UserController.listUsers());
  });

  app.get('/users/:id', async (req, res) => {
    const user_id = Number(req.params.id);
    res.status(200).json(await UserController.getUserById(user_id));
  });

  app.post('/auth/connect', async (req, res) => {
    const userId = req.query.username as string;
    const password = req.query.password as string;
    try {
      res.status(200).json(await UserController.connectUser(userId, password));
    } catch (e) {
      res.status(401).json(e.message);
    }
  });

  app.post('/users', async (req, res) => {
    const newUser: User = req.body;
    try {
      const result = await UserController.addUser(newUser);
      res.status(201).json(result);
    } catch (e) {
      res.status(409).json(e.message);
    }
  });
};
