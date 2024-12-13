import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { StorageService } from '../../../services/storage.service';
import { ModalController } from '@ionic/angular';
import { QrScannerService } from "../../../services/qr-scanner-service.service"; 

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  username: string = 'Alumno';
  carrera: string = 'Ingeniería en Informática';

  constructor(
    private router: Router,
    private loginService: LoginService,
    private storageService: StorageService,
    private modalController: ModalController,
    private readonly qrScannerService: QrScannerService
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

  async scan(): Promise<void> {
    try {
      const barcodes = await this.qrScannerService.scan();
      console.log('Código escaneado:', barcodes);
  
      if (barcodes) {
        if (typeof barcodes === 'string') {
          const qrDetails = this.processQRCode(barcodes);
  
          if (qrDetails) {
            await this.storeQRCode(qrDetails);
          } else {
            alert('Formato del QR inválido. Asegúrate de que sigue el formato adecuado (ASIGNATURA|SECCION|SALA|FECHA).');
          }
        } else if (Array.isArray(barcodes)) {
          for (const barcode of barcodes) {
            const qrDetails = this.processQRCode(barcode);
  
            if (qrDetails) {
              await this.storeQRCode(qrDetails);
            } else {
              alert('Formato del QR inválido. Asegúrate de que sigue el formato adecuado (ASIGNATURA|SECCION|SALA|FECHA).');
            }
          }
        } else {
          alert('Formato inesperado del código QR escaneado.');
          console.warn('Formato de barcodes:', barcodes);
          return;
        }
      } else {
        console.warn('No se detectaron datos al escanear.');
      }
    } catch (error) {
      console.error('Error al escanear:', error);
      alert('Error al escanear el código QR. Intenta nuevamente.');
    }
  }
  
  private processQRCode(qrCode: string) {
    const [asignatura, seccion, sala, fecha] = qrCode.split('|');
  
    if (asignatura && seccion && sala && fecha) {
      return { asignatura, seccion, sala, fecha };
    }
  
    console.warn('QR no válido:', qrCode);
    return null;
  }
  
  private async storeQRCode(qrDetails: { asignatura: string, seccion: string, sala: string, fecha: string }) {
    const existingQRCodes = (await this.storageService.get('qrDataList')) || [];
  
    existingQRCodes.push(qrDetails);
    await this.storageService.set('qrDataList', existingQRCodes);
  
    alert('Código QR almacenado con éxito.');
  } 
}  