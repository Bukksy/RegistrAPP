import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { StorageService } from '../../../services/storage.service';
import { ModalController } from '@ionic/angular';
import { QrscanPage } from '../qrscan/qrscan.page';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  username: string = 'Alumno';
  carrera: string = 'Ingenieria en Informatica';

  constructor(
    private router: Router,
    private loginService: LoginService,
    private storageService: StorageService,
    private modalController: ModalController
  ) { 
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.username = state['user'] || 'Usuario no especificado';
      this.carrera = state['carrera'] || 'Carrera no especificada';
    } else {
      this.loadUserData();
    }

    if (!this.loginService.isAlumno() && !this.loginService.isProfesor()) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.username = state['user'] || 'Usuario no especificado';
      this.carrera = state['carrera'] || 'Carrera no especificada';
    } else {
      this.loadUserData();
    }
  }
  
  async loadUserData() {
    const userData = await this.storageService.get('userData');
    if (userData) {
      this.username = userData.username || 'Usuario no especificado';
      this.carrera = userData.carrera || 'Carrera no especificada';
    }
  }

  async openScanner() {
    const modal = await this.modalController.create({
      component: QrscanPage
    });
    return await modal.present();
  }
}
