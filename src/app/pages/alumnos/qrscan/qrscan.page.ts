import { Component, OnInit, OnDestroy } from '@angular/core';
import { Html5QrcodeScanner } from 'html5-qrcode';

@Component({
  selector: 'app-qrscan',
  templateUrl: './qrscan.page.html',
  styleUrls: ['./qrscan.page.scss'],
})
export class QrscanPage implements OnInit, OnDestroy {
  scannedData: string = '';
  html5QrCodeScanner: Html5QrcodeScanner | undefined;

  constructor() {}

  ngOnInit(): void {
    this.startScanner();
  }

  startScanner() {
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
        this.html5QrCodeScanner?.clear();
      },
      (error) => {}
    );
  }

  ngOnDestroy(): void {
    this.html5QrCodeScanner?.clear().catch(() => {});
  }
}
