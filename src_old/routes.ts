/*import * as express from 'express';
import * as UserController from '../api/User/controllers/userController';
import User from './models/user';

export const register = (app: express.Application) => {
  app.get('/users', (req, res) => {
    res.status(200).json(UserController.listUsers());
  });

  app.post('/users', (req, res) => {
    const newUser: User = req.body;
    res.status(200).json(UserController.addUser(newUser));
  });
};*/
