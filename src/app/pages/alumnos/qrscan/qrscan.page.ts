import { Component, OnInit, OnDestroy } from '@angular/core';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qrscan',
  templateUrl: './qrscan.page.html',
  styleUrls: ['./qrscan.page.scss'],
})
export class QrscanPage implements OnInit, OnDestroy {
  scannedData: string = '';
  html5QrCodeScanner: Html5QrcodeScanner | undefined;
  isScanning: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  startScanner() {
    if (!this.isScanning) {
      this.html5QrCodeScanner = new Html5QrcodeScanner(
        'reader',
        {
          fps: 10,
          qrbox: 250,
        },
        false
      );

      this.html5QrCodeScanner.render(
        (decodedText) => {
          this.scannedData = decodedText;
          console.log('Código escaneado:', decodedText);
          this.html5QrCodeScanner?.clear();
        },
        (error) => {
          console.warn('Error de escaneo:', error);
        }
      );

      this.isScanning = true; 
    }
  }

  stopScanner() {
    if (this.isScanning) {
      this.html5QrCodeScanner?.clear().then(() => {
        console.log('Escáner detenido');
        this.isScanning = false;
      }).catch((error) => {
        console.error('Error al detener el escáner:', error);
      });
    }
  }

  back() {
    this.stopScanner();
    this.router.navigate(['/alumnos/inicio']);
  }

  ngOnDestroy(): void {
    this.stopScanner();
  }
}
