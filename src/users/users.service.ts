import { Inject, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { Database } from 'better-sqlite3';
import { DB } from '../DB';

@Injectable()
export class UserService {
  constructor(@Inject(DB) private db: Database) {
    this.createTable();
  }

  createTable() {
    const createtablequery =
      'CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT, email TEXT)';
    const createTable = this.db.prepare(createtablequery);
    createTable.run();
  }

  insert(user: User): User {
    const userObj = {
      id: null,
      name: user.name,
      email: user.email,
    };
    const insertQuery = this.db.prepare(
      `INSERT INTO user VALUES ($id, $name,$email)`,
    );

    const result = insertQuery.run(userObj);
    // user.id = result.lastInsertRowid;
    return {
      ...user,
      id: parseInt(result.lastInsertRowid.toString()),
    };
  }

  fetch(id: number): User {
    const getByQuery = this.db.prepare(`SELECT * FROM USER WHERE id = ?`);
    return getByQuery.get(id) as User;
  }

  fetchAll(): User[] {
    const getAllQuery = this.db.prepare(`SELECT * FROM user`);
    return getAllQuery.all() as User[];
  }
}
