import { Match } from '@pokefumi/pokefumi-common';
import { join } from 'path';
import * as sqlite3 from 'sqlite3';
export default class MatchmakingRepository {
  db: any;

  constructor() {
    // Importing SQLite3 to our project.
    // eslint-disable-next-line @typescript-eslint/no-var-requires

    // Setting up a database for storing data.
    console.log(__dirname);
    this.db = new sqlite3.Database(join(__dirname, './matchmaking.db'));

    this.db.run(`
    CREATE TABLE IF NOT EXISTS matchs (
      match_id INTEGER PRIMARY KEY AUTOINCREMENT,
      status TEXT DEFAULT "OPENED",
      isPublic BOOLEAN,
      joueur1 INTEGER,
      joueur2 INTEGER,
      gagnant INTEGER DEFAULT 0,
      createdAt TIMESTAMP
      DEFAULT CURRENT_TIMESTAMP
      updatedAt TIMESTAMP
      DEFAULT CURRENT_TIMESTAMP
      );`);

    this.db.run(`
    CREATE TABLE IF NOT EXISTS rounds (
      round_id INTEGER PRIMARY KEY AUTOINCREMENT,
      roundNumber INTEGER DEFAULT 0,
      matchId INTEGER,
      pokemonPlayer1 TEXT,
      pokemonPlayer2 TEXT,
      status TEXT NOT NULL DEFAULT 'STARTED',
      winner INTEGER DEFAULT 0
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

  async getMatchById(id: number) {
    return new Promise<Match>((resolve, reject) => {
      this.db.serialize(() => {
        this.db.all('SELECT * FROM match WHERE match_id=?', [id], (err: any, match: Match) => {
          if (err) {
            reject(err.message);
          } else {
            resolve(match);
          }
        });
      });
    });
  }

  async createMatch(match: Match): Promise<Match> {
    const params = [match.joueur1, match.isPublic];
    return new Promise<Match>((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run(`INSERT INTO matchs (joueur1,isPublic) VALUES(?,?);`, params, (err: any) => {
          if (err) {
            reject(err.message);
          } else {
            resolve(match);
          }
        });
      });
    }).catch(function () {
      return null;
    });
  }

  async setStatus(id: number, status: string) {
    return await (() => {
      this.db.all('UPDATE matchs SET status = ? WHERE match_id = ?', [status, id]);
    });
  }
}
