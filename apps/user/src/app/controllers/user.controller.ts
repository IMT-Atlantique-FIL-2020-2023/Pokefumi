import UserRepository from '../repository/user.repository';
import { User } from '@prisma/client/user';
const userRepository = new UserRepository();

const listUsers = async () => {
  return await userRepository.getAllUsers();
};

const getUserById = async (id: number) => {
  return await userRepository.getUserById(id);
};

const addUser = async (newUser: User) => {
  return await userRepository.createUser(newUser);
};

const connectUser = async (username: string, password: string) => {
  return await userRepository.connect(username, password);
};

export { listUsers, getUserById, addUser, connectUser };
