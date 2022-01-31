import User from './../models/user';
import UserRepository from './../bdd/UserRepository';

const userRepository = new UserRepository();

const typedUsers: User[] = [];
const listUsers = () => {
  return userRepository.getAllUsers();
};
// Faire une pause sur l'implem et commencer à réfléchir sur l'architetcure. Ressources qu'on va manipuler et gérer et comment on va distribuer ces ressources avec plusieurs micro-service.
// Mono-repo: toutes les ressources sont dans le même repo.

const addUser = (newUser: User) => {
  try {
    userRepository.createUser(newUser);
  } catch (e) {}
  return userRepository.getAllUsers();
};

export { listUsers, addUser };
