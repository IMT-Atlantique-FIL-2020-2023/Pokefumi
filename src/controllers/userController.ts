import User from './../models/user';
import UserRepository from './../bdd/UserRepository';

const userRepository = new UserRepository()

const typedUsers: User[] = []
const listUsers = () => {
  return userRepository.getAllUsers()
}

const addUser = (newUser: User) => {
  userRepository.createUser(newUser.name)
  return userRepository.getAllUsers()
}

export { listUsers, addUser }

