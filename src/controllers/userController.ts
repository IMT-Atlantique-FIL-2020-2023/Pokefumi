import User from './../models/user'

const typedUsers: User[] = []
const listUsers = () => {
  return userRepository.getAllUsers()
}

const addUser = (newUser: User) => {
  userRepository.createUser(newUser.name)
  return userRepository.getAllUsers()
}


export { listUsers, addUser }
