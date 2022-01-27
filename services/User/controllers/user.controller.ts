import User from '../models/user.model';
import UserRepository from '../repository/user.repository';

const userRepository = new UserRepository();

const typedUsers: User[] = [];
const listUsers = async () => {
  let res = await userRepository.getAllUsers();
  return res;
};

const addUser = (newUser: User) => {
  userRepository.createUser(newUser.name);
  return userRepository.getAllUsers();
};

export { listUsers, addUser };
