import * as express from "express"
import * as UserController from "./controllers/userController"
import  User  from './models/user'

export const register = ( app: express.Application ) => {
  app.get('/', (req, res) => res.send('Hello World!'));

  app.get('/user', (req, res) => {
	res.status(200).json(UserController.listUsers())
  })

  app.post('/user', (req, res) => {
	const newUser: User = req.body
	res.status(200).json(UserController.addUser(newUser))
  })
}
