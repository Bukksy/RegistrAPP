import { Component, OnInit } from '@angular/core';
import { RedirectCommand, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {
  }

  isProfileActive(): boolean {
    return this.router.url === '/alumnos/asistencia';
  }
}  
