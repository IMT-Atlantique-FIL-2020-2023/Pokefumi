import Database from 'better-sqlite3';
import { join } from 'path';
import User from '../models/user';
import fs from 'fs';

export default class UserRepository {
  db: Database.Database;

  constructor() {
    this.db = new Database('db/users.db', { verbose: console.log });
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

  getUserByUsername(username: string): User | undefined {
    const statement = this.db.prepare('SELECT * FROM users WHERE username = ?');
    const rows: User[] = statement.get(username);
    return rows.pop();
  }

  getAllUsers(): User[] {
    const statement = this.db.prepare("SELECT * FROM users")
    const rows: User[] = statement.all()
    return rows
  }

  getUserById(userId: number) {
	const statement = this.db
        .prepare("SELECT * FROM users WHERE user_id = ?")
	const rows: User[] = statement.get(userId)
	return rows
  }

  createUser(name: string) {
    const statement =
      this.db.prepare("INSERT INTO users (name) VALUES (?)")
    return statement.run(name).lastInsertRowid
  }

}
