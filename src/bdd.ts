import Database from 'better-sqlite3';
import  User  from './models/user';

export async function getUsers() {
  return queryMany<User>('SELECT id, name, score FROM user')
}

export async function getUser(userId: number) {
  return queryMany<User>('SELECT id, name, score FROM user WHERE id = ?', userId)
}

export async function addUser(name: string) {
  return update('INSERT INTO user (name) VALUES (?)', [name])
}
