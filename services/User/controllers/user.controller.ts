import User from '../models/user.model';
import UserRepository from '../repository/user.repository';

const userRepository = new UserRepository();

const typedUsers: User[] = [];
const listUsers = async () => {
  let res = await userRepository.getAllUsers();
  return res;
};

const getUserById = async (id: number) => {
  let res = await userRepository.getUserById(id);
  return res;
};

const deleteUserById = async (id: number) => {
  let res = await userRepository.deleteUserById(id);
  return res;
};

const addUser = async (newUser: User) => {
  let res = await userRepository.createUser(newUser);
  return res;
};

export { listUsers, addUser, getUserById,deleteUserById };
