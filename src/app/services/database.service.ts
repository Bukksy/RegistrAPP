// database.service.ts

import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private dbInstance!: SQLiteObject;

  constructor(private sqlite: SQLite) {}

  async initializeDatabase() {
    try {
      this.dbInstance = await this.sqlite.create({
        name: 'mydatabase.db',
        location: 'default'
      });
      await this.createTables();
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  private async createTables() {
    if (this.dbInstance) {
      const sqlUsers = `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        carrera TEXT,
        correo TEXT
      );`;

      const sqlProfesores = `CREATE TABLE IF NOT EXISTS profesores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        carrera TEXT,
        correo TEXT
      );`;

      try {
        await this.dbInstance.executeSql(sqlUsers, []);
        await this.dbInstance.executeSql(sqlProfesores, []);
        console.log('Tables created successfully');
      } catch (error) {
        console.error('Error creating tables:', error);
      }
    }
  }

  async getAllUsers(): Promise<any[]> {
    const users: any[] = [];
    const query = 'SELECT * FROM users';
    try {
      const result = await this.dbInstance.executeSql(query, []);
      for (let i = 0; i < result.rows.length; i++) {
        users.push(result.rows.item(i));
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    return users;
  }

  async getAllProfesores(): Promise<any[]> {
    const profesores: any[] = [];
    const query = 'SELECT * FROM profesores';
    try {
      const result = await this.dbInstance.executeSql(query, []);
      for (let i = 0; i < result.rows.length; i++) {
        profesores.push(result.rows.item(i));
      }
    } catch (error) {
      console.error('Error fetching profesores:', error);
    }
    return profesores;
  }

  async getUserByUsername(username: string): Promise<any> {
    const query = 'SELECT * FROM users WHERE username = ?';
    try {
      const result = await this.dbInstance.executeSql(query, [username]);
      return result.rows.length > 0 ? result.rows.item(0) : null;
    } catch (error) {
      console.error('Error fetching user by username:', error);
      return null;
    }
  }
}
