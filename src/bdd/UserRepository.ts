import Database from 'better-sqlite3';
import { join } from 'path';
import User from '../models/user';
import fs from 'fs';

export default class UserRepository {
  db: Database.Database;

  constructor() {
    this.db = new Database(join(process.cwd(), 'users.db'), { verbose: console.log });
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
      const migrations = [join(__dirname, 'migrations/init_user.sql')];
      migrations.forEach(applyMigration);
    }
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
  getUserById(userId: number) {
    const statement = this.db.prepare('SELECT * FROM users WHERE user_id = ?');
    const rows: User[] = statement.get(userId);
    return rows;
  }

  createUser(name: string) {
    const statement = this.db.prepare('INSERT INTO users (name) VALUES (?)');
    return statement.run(name).lastInsertRowid;
  }
}
