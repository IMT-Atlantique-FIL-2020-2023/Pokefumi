import { Match } from '@pokefumi/pokefumi-common';
import { join } from 'path';
export default class MatchmakingRepository {
  db: any;

  constructor() {
    // Importing SQLite3 to our project.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const sqlite3 = require('sqlite3');

    // Setting up a database for storing data.
    this.db = new sqlite3.Database(join(__dirname, './users.db'));
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

    this.db.run(`
    CREATE TABLE IF NOT EXISTS matchs (
      match_id INTEGER PRIMARY KEY AUTOINCREMENT,
      status TEXT NOT NULL,
      isPublic BOOLEAN,
      joueur1 INTEGER,
      joueur2 INTEGER,
      gagnant INTEGER DEFAULT 0,
      FOREIGN KEY(joueur1) REFERENCES users(user_id),
      FOREIGN KEY(joueur2) REFERENCES users(user_id)
      );`);

    this.db.run(`
    CREATE TABLE IF NOT EXISTS rounds (
      round_id INTEGER PRIMARY KEY AUTOINCREMENT,
      roundNumber INTEGER DEFAULT 0,
      matchId INTEGER,
      pokemonPlayer1 TEXT NOT NULL,
      pokemonPlayer2 TEXT NOT NULL,
      status TEXT NOT NULL,
      winner INTEGER DEFAULT 0,  
      FOREIGN KEY(matchId) REFERENCES matchs(match_id)
      );`);
  }

  async getAllMatchs() {
    return await new Promise<Match[]>((resolve, reject) => {
      this.db.all('SELECT * FROM matchs', [], (err: any, rows: any) => {
        if (err) reject(err.message);
        resolve(rows);
      });
    });
  }
}
