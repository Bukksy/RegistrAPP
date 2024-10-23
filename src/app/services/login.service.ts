import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { profesores } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  users: User[] = [
    {
      username: "alumno",
      password: "12345",
      carrera: "Ingenieria en informatica"
    },
    {
      username: "alumno1",
      password: "12345",
      carrera: "Ingenierio en electronica"
    },
    {
      username: "alumno2",
      password: "12345",
      carrera: "Ingenierio en mecanica"
    }
  ];

  profesoress: profesores[] = [
    {
      username: 'profesor',
      password: '1234',
    },
    {
      username: 'profesor1',
      password: '1234',
    },
    {
      username: 'profesor2',
      password: '1234',
    }
  ];

  constructor() { }

  validateLogin(u: string, p: string): {valid: boolean, carrera?: string} {
    for (let alumnos = 0; alumnos < this.users.length; alumnos++) {
      const user = this.users[alumnos];
      if (user.username === u && user.password === p) {
        console.log(`Alumno encontrado: ${u}`);
        return { valid: true, carrera: user.carrera }; 
      }
    }

    for (let profesores = 0; profesores < this.profesoress.length; profesores++) {
      const profesor = this.profesoress[profesores];
      if (profesor.username === u && profesor.password === p) {
        console.log(`Profesor encontrado: ${u}`);
        return { valid: true };
      }
    }
    console.log(`Usuario no encontrado: ${u}`);
    return { valid: false };
  }
}
