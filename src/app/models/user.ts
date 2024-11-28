export class User {
    username!: string;
    password!: string;
    correo!: string;
    carrera!: string;
}

export class Profesores {
    username!: string;
    correo!: string;
    password!: string;
    asignaturas!: Asignatura[];
}

export class Asignatura{
    name!: string;
    button!: string;
    content!: string;
}