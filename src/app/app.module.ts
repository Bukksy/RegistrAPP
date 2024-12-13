import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { QrModalComponent } from './components/qr-modal/qr-modal.component';
import {QrScannerService} from "./services/qr-scanner-service.service"; 
 
export function initQrScannerService(qrScannerService: QrScannerService) {
  return () => qrScannerService.init();
}
 
export function qrScannerService() {
  return {
    provide: APP_INITIALIZER,
    useFactory: initQrScannerService,
    deps: [QrScannerService],
    multi: true,
  };
}

@NgModule({
  declarations: [AppComponent, QrModalComponent], 
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, qrScannerService()],
  bootstrap: [AppComponent],
})
export class AppModule {}