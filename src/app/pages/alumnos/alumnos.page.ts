import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Animation, AnimationController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { LoginService } from '../../services/login.service';


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
    private menuCtrl: MenuController,
    private navCtrl: NavController,
    private loginService: LoginService
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if(state){
      console.log(`Username: ${state['user']}`);
      this.username = state['user'] || 'Usuario no especificado';
      this.carrera = state['carrera'] || 'Carrera no especificada';
    } else {
      if (!this.loginService.isAlumno() && !this.loginService.isProfesor()) {
        this.router.navigate(['/home']);
      }
    }
  }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/home']);
  }

  ngAfterViewInit() {
    const bienvenida = document.querySelector('#bienvenida');
    const bienvenida2 = document.querySelector('.bienvenida');
  
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
