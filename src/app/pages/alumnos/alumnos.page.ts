import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Animation, AnimationController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';


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
    private menuCtrl: MenuController
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if(state){
      console.log(`Username: ${state['user']}`);
      this.username = state['user'] || 'Usuario no especificado';
      this.carrera = state['carrera'] || 'Carrera no especificada';
    }
  }

  navigateTo(page: string) {
    this.router.navigate([`alumnos/${page}`]);
    }

  openFirstMenu() {
    this.menuCtrl.open('first-menu');
  }

  ngOnInit() {
  }

  logoff(){
    console.log('Cerrando Sesion...')

    this.router.navigate(['/home'])
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
