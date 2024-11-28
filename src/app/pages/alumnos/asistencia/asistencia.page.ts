import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  username: string = 'Invitado';
  carrera: string = 'Carrera no especificada';
  correo: string = 'Correo no encontrado';

  constructor(private router: Router, private loginService: LoginService) { 
    this.initializeUserData();
  }

  ngOnInit() {
  }

  private initializeUserData() {
    const currentUser = localStorage.getItem('currentUser');
    const currentUser2 = localStorage.getItem('currentUser2');

    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.username = user.username || 'Usuario no encontrado';
      this.carrera = user.carrera || 'Carrera no especificada';
      this.correo = user.correo || 'Correo no encontrado'; 
    } else {
      this.router.navigate(['/home']); 
    }
  }
}
