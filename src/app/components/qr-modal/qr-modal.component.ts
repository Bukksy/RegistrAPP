import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular'; // Cambiado a ModalController

@Component({
  selector: 'app-qr-modal',
  templateUrl: './qr-modal.component.html',
  styleUrls: ['./qr-modal.component.scss'],
})
export class QrModalComponent {
  @Input() qrCodeUrl: string | null = null;

  constructor(private modalController: ModalController) {} // Cambiado a ModalController

  closeModal() {
    console.log('Cerrando el modal...');
    this.modalController.dismiss(); 
  }
}
