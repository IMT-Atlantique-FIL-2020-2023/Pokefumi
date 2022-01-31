import * as express from 'express';
import * as UserController from '../controllers/user.controller';
import User from '../models/user.model';

export const register = async (app: express.Application) => {
  app.get('/users', async (req, res) => {
    let users = await UserController.listUsers();
    res.status(200).json(users);
  });

  app.get('/users/:id', async (req, res) => {
    const user_id = Number(req.params.id);
    let users = await UserController.getUserById(user_id);
    res.status(200).json(users);
  });

  app.post('/users', async (req, res) => {
    const newUser: User = req.body;
    let result = await UserController.addUser(newUser);
    result ? res.status(200).json(result) : res.status(409).json('could not insert user. Check the body of your request.');
  });

  app.delete('/users/:id', async (req, res) => {
    const user_id = Number(req.params.id);
    let users = await UserController.deleteUserById(user_id);
    res.status(200).json(users);
  });
};
