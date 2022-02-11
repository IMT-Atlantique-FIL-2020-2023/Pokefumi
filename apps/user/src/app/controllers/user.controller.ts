import { User } from '@pokefumi/pokefumi-common';
import UserRepository from '../repository/user.repository';

const userRepository = new UserRepository();

const typedUsers: User[] = [];
const listUsers = async () => {
  return await userRepository.getAllUsers();
};

const getUserById = async (id: number) => {
  return await userRepository.getUserById(id);
};

const deleteUserById = async (id: number) => {
  let res = await userRepository.deleteUserById(id);
  return res;
};

const addUser = async (newUser: User) => {
  return await userRepository.createUser(newUser);
};

export { listUsers, addUser, getUserById,deleteUserById };
