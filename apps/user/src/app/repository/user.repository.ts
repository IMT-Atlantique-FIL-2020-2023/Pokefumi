import { User } from '@pokefumi/pokefumi-common';
import { join } from 'path';

import { PrismaClient } from '@prisma/client'

export default class UserRepository {
  prisma: any;

  constructor() {

    this.prisma = new PrismaClient()

    this.loadSampleData();

    // Importing SQLite3 to our project.
    // eslint-disable-next-line @typescript-eslint/no-var-requires

    /*
    const Database = require('better-sqlite3');
    this.db = new Database('./users.db', { verbose: console.log });

    // Setting up a database for storing data.
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

  /*connectUser(username: string, password: string): User | undefined {
    const statement = this.db.prepare('SELECT * FROM users WHERE username = ? AND password = ?');
    const rows: User[] = statement.get(username, password);
    return rows.pop();
  }*/

  async getAllUsers() {
      const allUsers = await this.prisma.user.findMany();
      return allUsers;
  }

  async getUserById(id:number) {
    const allUsers = await this.prisma.user.findById(id);
    return allUsers;
}

  async loadSampleData(){
    const user = await this.prisma.user.create({
      data: {
        username: 'user',
        statut: "offline",
        password: "mdp"
      },
    })
  }
}