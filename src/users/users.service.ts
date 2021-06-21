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

  insert(user: User) {
    const userObj = {
      id: null,
      name: user.name,
      email: user.email,
    };
    const insertQuery = this.db.prepare(
      `INSERT INTO user VALUES ($id, $name,$email)`,
    );
    try {
      const result = insertQuery.run(userObj);
      return {
        rowId: result.lastInsertRowid,
      };
    } catch (err) {
      console.log(err);
      return {
        response: 'unable to add',
      };
    }
  }

  fetch(id: number) {
    const getByQuery = this.db.prepare(`SELECT * FROM USER WHERE id = ?`);
    try {
      return getByQuery.all(id);
    } catch (err) {
      console.log('Exception caught');
      return {
        response: 'unable to fetch',
      };
    }
  }

  fetchAll() {
    const getAllQuery = this.db.prepare(`SELECT * FROM user`);
    try {
      const rs = getAllQuery.all();
      return {
        result: rs,
      };
    } catch (err) {
      console.log('Exception caught');
      return {
        response: 'unable to fetch',
      };
    }
  }
}
