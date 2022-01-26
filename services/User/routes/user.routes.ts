import * as express from 'express';
import * as UserController from '../controllers/user.controller';
import User from '../models/user.model';

export const register = (app: express.Application) => {
  app.get('/users', (req, res) => {
    res.status(200).json(UserController.listUsers());
  });

  app.post('/users', (req, res) => {
    const newUser: User = req.body;
    res.status(200).json(UserController.addUser(newUser));
  });
};
