import User from './../models/user'

const typedUsers: User[] = []

const listUsers = () => typedUsers

const addUser = (newUser: User) => {
  typedUsers.push(newUser)
  return typedUsers
}

export { listUsers, addUser }
