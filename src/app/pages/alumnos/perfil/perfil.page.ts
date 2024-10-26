import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, MenuController } from '@ionic/angular';
import { LoginService } from '../../../services/login.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  username: string = 'Invitado';
  carrera: string = 'Carrera no especificada';
  correo: string = 'Correo no encontrado';

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private loginService: LoginService,
    private storageService: StorageService
  ) { 
    this.initializeUserData();
  }

  ngOnInit() {
    // Aquí podrías cargar información adicional si lo necesitas
  }

  private async initializeUserData() {
    const currentUser = localStorage.getItem('currentUser');
    const currentUser2 = localStorage.getItem('currentUser2');

    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.username = user.username || 'Usuario no encontrado';
      this.carrera = user.carrera || 'Carrera no especificada';
      // También puedes cargar el correo si es necesario
      this.correo = user.correo || 'Correo no encontrado'; // Si quieres obtener el correo de otra fuente
    } else {
      this.router.navigate(['/home']); // Si no hay usuario logueado, redirige al home
    }
  }

  isProfileActive(): boolean {
    return this.router.url === '/alumnos/perfil';
  }
}
