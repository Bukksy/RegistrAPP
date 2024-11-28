import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
})
export class AsignaturasPage implements OnInit {
  username: string = 'Invitado';
  asignaturas: any[] = []; // Cambia el tipo según tu modelo de asignaturas
  carrera: string = 'Carrera no especificada';

  constructor(private router: Router, private loginService: LoginService) { 
    this.initializeUserData();
  }

  ngOnInit() {
    // Aquí podrías cargar información adicional si lo necesitas
  }

  private initializeUserData() {
    const currentUser = localStorage.getItem('currentUser');
    const currentUser2 = localStorage.getItem('currentUser2');

    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.username = user.username || 'Usuario no encontrado';
      this.carrera = user.carrera || 'Carrera no especificada';
    } else {
      this.router.navigate(['/home']); // Redirige si no hay usuario logueado
    }
  }
}
