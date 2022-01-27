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
    VALUES('user1', 'password1');`);*/
  }

  connectUser(username: string, password: string): User | undefined {
    const statement = this.db.prepare('SELECT * FROM users WHERE username = ? AND password = ?');
    const rows: User[] = statement.get(username, password);
    return rows.pop();
  }
  /*let result = new Array();
    this.db.each('SELECT * FROM users', function (err: string, row: User) {
      console.log("1") +row); // and other columns, if desired
      result.push(row);
    });
    console.log(result.length);
    return result;*/
  async getAllUsers() {
    return await new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM users', [], (err: any, rows: any) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }

  getUserById(userId: number) {
    const statement = this.db.prepare('SELECT * FROM users WHERE user_id = ?');
    const rows: User[] = statement.get(userId);
    console.log(rows.length);
  }

  createUser(name: string) {
    const statement = this.db.prepare('INSERT INTO users (name) VALUES (?)');
    return statement.run(name).lastInsertRowid;
  }
}
