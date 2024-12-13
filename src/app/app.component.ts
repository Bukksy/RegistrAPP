import { Component } from '@angular/core';
import { formatDate } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { LoginService } from './services/login.service';
import { Asignatura } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  asignaturas: Asignatura[] | null = null;

  constructor(
    private alertController: AlertController,
    private platform: Platform,
    private loginService: LoginService
  ) {
    this.initializeApp();
    this.loadAsignaturas();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      document.body.classList.remove('dark');
    });
  }

  // Carga las asignaturas del profesor autenticad
  loadAsignaturas() {
    if (this.loginService.isProfesor()) {
      const currentUserData = localStorage.getItem('currentUser2');
      if (currentUserData) {
        const parsedData = JSON.parse(currentUserData);
        this.asignaturas = parsedData.asignaturas || [];
      }
    }
  }

  // Muestra un mensaje de asistencia para una asignatura específica
  async showAttendance(asignatura: Asignatura) {
    const currentTime = formatDate(new Date(), 'shortTime', 'en-US');
    const alert = await this.alertController.create({
      header: 'Registrar Asistencia',
      message: `La asistencia será registrada a las: ${currentTime} para la clase ${asignatura.name} en la sala ${asignatura.sala}.`,
      buttons: ['Escanear QR'],
    });

    await alert.present();
  }
}
