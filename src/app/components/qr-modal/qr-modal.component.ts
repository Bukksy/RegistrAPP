import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-qr-modal',
  templateUrl: './qr-modal.component.html',
  styleUrls: ['./qr-modal.component.scss'],
})
export class QrModalComponent {
  @Input() qrCodeUrl: string | null = null;
  @Input() asignaturaName: string | null = null;
  @Input() seccion: string | null = null;
  @Input() sala: string | null = null;

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }
}
