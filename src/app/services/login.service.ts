import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Profesores } from '../models/user';
import { Asignatura } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  users: User[] = [
    { username: "alumno", password: "12345", carrera: "Ingeniería en informática", correo: "example@duoc.cl" },
    { username: "alumno1", password: "12345", carrera: "Ingeniero en electrónica", correo: "example@duoc.cl" },
    { username: "alumno2", password: "12345", carrera: "Ingeniero en mecánica", correo: "example@duoc.cl" }
  ];

  profesores: Profesores[] = [
    { 
      username: 'profesor', 
      password: '12345', 
      correo: "example@duoc.cl", 
      asignaturas: [ 
        { name: 'C. Software', button: 'Generar QR', content: 'QR para C. Software', seccion: '020V', sala: 'LC01' },
        { name: 'Arquitectura', button: 'Generar QR', content: 'QR para Arquitectura', seccion: '020V', sala: 'LC01' },
        { name: 'Programación', button: 'Generar QR', content: 'QR para Programación', seccion: '020V', sala: 'LC01' }
      ]
    },
    { 
      username: 'profesor1', 
      password: '12345', 
      correo: "example@duoc.cl", 
      asignaturas: [ 
        { name: 'C. Software', button: 'Generar QR', content: 'QR para Arquitectura', seccion: '020V', sala: 'LC01' },
        { name: 'Arquitectura', button: 'Generar QR', content: 'QR para Portafolio', seccion: '020V', sala: 'LC01' },
        { name: 'Programación', button: 'Generar QR', content: 'QR para Ingeniería', seccion: '020V', sala: 'LC01' }
      ]
    },
    { 
      username: 'profesor2', 
      password: '12345', 
      correo: "example@duoc.cl", 
      asignaturas: [ 
        { name: 'Modelamiento', button: 'Generar QR', content: 'QR para Modelamiento', seccion: '020V', sala: 'LC01' },
        { name: 'BPM', button: 'Generar QR', content: 'QR para BPM', seccion: '020V', sala: 'LC01' },
        { name: 'Seguridad', button: 'Generar QR', content: 'QR para Seguridad', seccion: '020V', sala: 'LC01' }
      ]
    }
];


  currentUser: { username: string; carrera?: string, correo?: string } | null = null;
  currentUser2: { username: string; asignaturas?: Asignatura[] } | null = null;

  constructor() { }

  validateLogin(u: string, p: string): { valid: boolean, carrera?: string, asignaturas?: Asignatura[], correo?: string} {
    const user = this.users.find(user => user.username === u && user.password === p);
    const profesor = this.profesores.find(prof => prof.username === u && prof.password === p);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify({ username: u, carrera: user.carrera }));
      return { valid: true, carrera: user.carrera, correo: user.correo };
    } else if (profesor) {
      localStorage.setItem('currentUser2', JSON.stringify({ username: u, asignaturas: profesor.asignaturas }));
      return { valid: true, asignaturas: profesor.asignaturas };
    }
    return { valid: false };
  }

  isAlumno(): boolean {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser !== null;
  }

  // Método para verificar si el usuario actual es un profesor
  isProfesor(): boolean {
    const currentUser2 = localStorage.getItem('currentUser2');
    return currentUser2 !== null;
  }
}