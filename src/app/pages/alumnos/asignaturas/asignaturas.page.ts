import { Component, OnInit } from '@angular/core';
import { RedirectCommand, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LoginService } from '../../../services/login.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
})
export class AsignaturasPage implements OnInit {

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private loginService: LoginService,
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {}


  isProfileActive(): boolean {
    return this.router.url === '/alumnos/asignaturas';
  }

  logout() {
    this.router.navigate(['/home']); 
  }

  back(){
    console.log('volviendo atras...')

    this.navCtrl.navigateRoot('/alumnos');
  }
}
