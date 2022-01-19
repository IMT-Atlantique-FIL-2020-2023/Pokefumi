import Database from 'better-sqlite3';

export async function getUser(userId: number) {
  return queryMany<User>('SELECT id, name, score FROM user WHERE id = ?', userId);
}
