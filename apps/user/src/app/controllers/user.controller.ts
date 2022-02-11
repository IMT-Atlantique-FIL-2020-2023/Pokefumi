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
/*
const addUser = async (newUser: User) => {
  return await userRepository.createUser(newUser);
};*/

<<<<<<< HEAD
export { listUsers ,getUserById/*, addUser,  */ };
=======
export { listUsers, addUser, getUserById,deleteUserById };
>>>>>>> cdff873e53c458c317a58d3b3d04d2968386a9b0
