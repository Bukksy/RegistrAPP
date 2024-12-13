import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Animation, AnimationController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { LoginService } from '../../services/login.service';
import { NavController } from '@ionic/angular';
import { QrModalComponent } from '../../components/qr-modal/qr-modal.component';
import { ModalController } from '@ionic/angular';
import * as QRCode from 'qrcode';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.page.html',
  styleUrls: ['./profesores.page.scss'],
})
export class ProfesoresPage implements OnInit {

  username: string = '?';
  asignaturas: { name: string; button: string; content: string }[] = [];
  opcionSeleccionada: { name: string; button: string; content: string } | null = null;
  qrCodeUrl: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private animationCtrl: AnimationController,
    private menuCtrl: MenuController,
    private loginService: LoginService,
    private navCtrl: NavController,
    private modalController: ModalController,
    private storageService: StorageService
  ) {
    const currentUser2 = JSON.parse(localStorage.getItem('currentUser2') || '{}');

    if (currentUser2) {
      this.username = currentUser2.username || 'Usuario no especificado';
      this.asignaturas = Array.isArray(currentUser2.asignaturas) ? currentUser2.asignaturas : [];
      console.log(`Asignaturas: ${JSON.stringify(this.asignaturas)}`);
    }
  }

  ngOnInit() {}

  mostrarBotones(asignatura: { name: string; button: string; content: string }) {
    this.opcionSeleccionada = asignatura;
  }

  async presentQrModal() {
    const modal = await this.modalController.create({
      component: QrModalComponent,
      componentProps: {
        qrCodeUrl: this.qrCodeUrl, 
      },
      cssClass: 'qr-modal',
    });
    return await modal.present();
  }

  generarQRCode(hora: string) {
    if (this.opcionSeleccionada) {
      const data = `Se registra asistencia a: ${this.opcionSeleccionada.name} a la hora: ${hora}`;
      QRCode.toDataURL(data)
        .then(async url => {
          this.qrCodeUrl = url;
          await this.presentQrModal();
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  async confirmarAsistencia() {
    const HoraActual = new Date(); 
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, 
    };

    const formattedTime = HoraActual.toLocaleTimeString('es-CL', options);

    const alert = await this.alertController.create({
      header: 'Tomar asistencia',
      message: `¿Deseas tomar asistencia? - Se tomará asistencia a las ${formattedTime} para la asignatura ${this.opcionSeleccionada?.name}.`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Sí',
          handler: async () => {
            this.generarQRCode(formattedTime);
          },
        },
      ],
    });

    await alert.present();
  }

  // Método para obtener asignaturas formateadas
  obtenerAsignaturasFormateadas(): string[] {
    const fechaActual = new Date().toLocaleDateString('es-CL'); // Formato de fecha actual
    return this.asignaturas.map(asignatura => {
      const seccion = '020V'; // Suponiendo una sección fija
      const sala = 'LC01';   // Suponiendo una sala fija
      return `${asignatura.name}|${seccion}|${sala}|${fechaActual}`;
    });
  }

  openFirstMenu() {
    this.menuCtrl.open('first-menu');
  }
  
  ngAfterViewInit() {
    this.animateWelcomeMessage();
  }

  private animateWelcomeMessage() {
    const bienvenida = document.querySelector('#bienvenida');
    const bienvenida2 = document.querySelector('.bienvenida');

    if (bienvenida) {
      const animationBienvenida: Animation = this.animationCtrl.create()
        .addElement(bienvenida)
        .duration(1000)
        .easing('ease-in-out')
        .fromTo('opacity', '0', '1')
        .fromTo('transform', 'translateY(50px)', 'translateY(0px)');

      animationBienvenida.play();
    } else {
      console.log('Error en la animación');
    }

    if (bienvenida2) {
      const animationBienvenida: Animation = this.animationCtrl.create()
        .addElement(bienvenida2)
        .duration(1000)
        .easing('ease-in-out')
        .fromTo('opacity', '0', '1')
        .fromTo('transform', 'translateY(50px)', 'translateY(0px)');

      animationBienvenida.play();
    } else {
      console.log('Error en la animación');
    }
  }

  logoff() {
    // Limpia todos los datos del almacenamiento local y del servicio de almacenamiento
    localStorage.clear();
    this.storageService.clear();
    this.router.navigate(['/home'], { replaceUrl: true }).then(() => {
      window.location.reload();
    });
  }
}
