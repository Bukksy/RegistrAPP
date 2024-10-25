import { Component, OnInit } from '@angular/core';
import { RedirectCommand, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {
  }

  isProfileActive(): boolean {
    return this.router.url === '/alumnos/perfil';
  }
}
