import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Animation, AnimationController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { LoginService } from '../../services/login.service';
import { StorageService } from '../../services/storage.service'; // Importa el servicio de almacenamiento

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {

  username: string = 'Invitado';
  carrera: string = 'Ingenieria en Informatica';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private animationCtrl: AnimationController,
    private menuCtrl: MenuController,,
    private navCtrl: NavController,
    private loginService: LoginService,
    private storageService: StorageService
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
      this.loadUserData(); // Cargar datos desde localStorage si no hay estado
    }
  }
  
  async loadUserData() {
    const userData = await this.storageService.get('userData');
    if (userData) {
      this.username = userData.username || 'Usuario no especificado';
      this.carrera = userData.carrera || 'Carrera no especificada';
    }
  }
  
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUser2');
    this.storageService.clear();
    this.router.navigate(['/home']);
  }

  asistencia(){
    this.router.navigate(['/home']);
  }

  ngAfterViewInit() {
    this.animateBienvenida('#bienvenida');
    this.animateBienvenida('.bienvenida');
  }

  private animateBienvenida(selector: string) {
    const bienvenida = document.querySelector(selector);
  
    if (bienvenida) {
      const animationbienvenida: Animation = this.animationCtrl.create()
        .addElement(bienvenida)
        .duration(1000)
        .easing('ease-in-out')
        .fromTo('opacity', '0', '1')
        .fromTo('transform', 'translateY(50px)', 'translateY(0px)');
  
      animationbienvenida.play();
    } else {
      console.log('Error en la animacion')
    }

    if (bienvenida2) {
      const animationbienvenida: Animation = this.animationCtrl.create()
        .addElement(bienvenida2)
        .duration(1000)
        .easing('ease-in-out')
        .fromTo('opacity', '0', '1')
        .fromTo('transform', 'translateY(50px)', 'translateY(0px)');
  
      animationbienvenida.play();
    } else {
      console.log('Error en la animacion')
    }
  }

}
