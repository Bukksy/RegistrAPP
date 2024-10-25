import { Component } from '@angular/core';
import { formatDate } from '@angular/common';
import { AlertController, Platform, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  userRole: string | null = null;

  constructor(
    private alertController: AlertController,
    private platform: Platform,
    private menu: MenuController,
    private storage: Storage
  ) {
  }

  async showAttendance() {
    const currentTime = formatDate(new Date(), 'shortTime', 'en-US');
    const alert = await this.alertController.create({
      header: 'Registrar Asistencia',
      message: `La asistencia será registrada a las: ${currentTime}`,
      buttons: ['Escanear QR'],
    });

    await alert.present();
  }
}
