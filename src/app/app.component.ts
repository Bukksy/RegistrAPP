import { Component } from '@angular/core';
import { formatDate } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private alertController: AlertController, private platform: Platform) {
    this.initializeApp();
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      document.body.classList.remove('dark');
    });
  }

  async showAttendance() {
    const currentTime = formatDate(new Date(), 'shortTime', 'en-US');
    const alert = await this.alertController.create({
      header: 'Registrar Asistencia',
      message: `La asistencia sera registrada a las: ${currentTime}`,
      buttons: ['Escanear QR'],
    });

    await alert.present();
  }
}
