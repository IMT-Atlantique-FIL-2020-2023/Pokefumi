import Database from 'better-sqlite3';
import { join } from 'path';
import User from '../models/user';
import fs from 'fs';

export default class MatchRepository {
  db: Database.Database;

  constructor() {
    this.db = new Database(join(process.cwd(), 'matchs.db'), { verbose: console.log });
    this.applyMigrations();
  }

  applyMigrations() {
    const applyMigration = (path: string) => {
      const migration = fs.readFileSync(path, 'utf8');
      this.db.exec(migration);
    };

    const testRow = this.db.prepare("SELECT name FROM sqlite_schema  WHERE type = 'table' AND name = 'users'").get();

    if (!testRow) {
      console.log('Applying migrations on DB users...');
      const migrations = [join(__dirname, 'migrations/init_matchs.sql')];
      migrations.forEach(applyMigration);
    }
  }

  getUserByUsername(username: string): User | undefined {
    const statement = this.db.prepare('SELECT * FROM users WHERE username = ?');
    const rows: User[] = statement.get(username);
    return rows.pop();
  }

  createUser(user: User) {
    const statement = this.db.prepare<User>('INSERT INTO users (username, password, score) VALUES (@username, @password, @score)');
    return statement.run(user).lastInsertRowid;
  }

  connectUser(username: string, password: string): User | undefined {
    const statement = this.db.prepare('SELECT * FROM users WHERE username = ? AND password = ?');
    const rows: User[] = statement.get(username, password);
    return rows.pop();
  }

  getAllUsers(): User[] {
    const statement = this.db.prepare('SELECT * FROM users');
    return statement.all();
  }
}