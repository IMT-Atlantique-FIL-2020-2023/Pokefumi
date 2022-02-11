import * as express from 'express';
import * as UserController from '../controllers/user.controller';
import { User } from '@pokefumi/pokefumi-common';
var cors = require('cors')


export const register = async (app: express.Application) => {
  app.use(cors())
  app.get('/users', async (req, res) => {
    res.status(200).json(await UserController.listUsers()
    );
  });

  app.get('/users/:id', async (req, res) => {
    const user_id = Number(req.params.id);
    res.status(200).json(await UserController.getUserById(user_id));
  });
  /*
  app.post('/users', async (req, res) => {
    const newUser: User = req.body;
    const result = await UserController.addUser(newUser);
    result ? res.status(200).json(result) : res.status(409).json('could not insert user. Check the body of your request.');
  });*/
};
