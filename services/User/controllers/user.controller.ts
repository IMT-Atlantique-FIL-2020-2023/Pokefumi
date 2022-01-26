import User from '../models/user.model';
import UserRepository from '../repository/user.repository';

const userRepository = new UserRepository();

const typedUsers: User[] = [];
const listUsers = () => {
  return userRepository.getAllUsers();
};

const addUser = (newUser: User) => {
  userRepository.createUser(newUser.name);
  return userRepository.getAllUsers();
};

export { listUsers, addUser };