import User from '../models/user.model';

export default class UserRepository {
  db: any;

  constructor() {
    // Importing SQLite3 to our project.
    const sqlite3 = require('sqlite3');

    // Setting up a database for storing data.
    this.db = new sqlite3.Database('./repository/user.db');
    this.db.run(`
    CREATE TABLE IF NOT EXISTS users (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      score INTEGER DEFAULT 0,
      UNIQUE(username)
      );`);
    /*this.db.run(`
    INSERT INTO users (username,password)
    VALUES('user2', 'password2');`);*/
  }

  connectUser(username: string, password: string): User | undefined {
    const statement = this.db.prepare('SELECT * FROM users WHERE username = ? AND password = ?');
    const rows: User[] = statement.get(username, password);
    return rows.pop();
  }

  async getAllUsers() {
    return await new Promise<User[]>((resolve, reject) => {
      this.db.all('SELECT * FROM users', [], (err: any, rows: any) => {
        if (err) reject(err.message);
        resolve(rows);
      });
    });
  }

  async getUserById(id: number) {
    return new Promise<User>((resolve, reject) => {
      this.db.serialize(() => {
        this.db.all('SELECT * FROM users WHERE user_id=?', [id], (err: any, user: User) => {
          if (err) {
            reject(err.message);
          } else {
            resolve(user);
          }
        });
      });
    });
  }

  async createUser(name: string) {
    const statement = this.db.prepare('INSERT INTO users (name) VALUES (?)');
    return statement.run(name).lastInsertRowid;
  }
}
