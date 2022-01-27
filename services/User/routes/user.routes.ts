import * as express from 'express';
import * as UserController from '../controllers/user.controller';
import User from '../models/user.model';

export const register = async (app: express.Application) => {
  app.get('/users', async (req, res) => {
    let users = await UserController.listUsers();
    console.log(users);
    res.status(200).json(users);
  });

  app.post('/users', (req, res) => {
    const newUser: User = req.body;
    res.status(200).json(UserController.addUser(newUser));
  });
};
