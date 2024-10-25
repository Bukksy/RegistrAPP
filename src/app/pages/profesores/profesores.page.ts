import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Animation, AnimationController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.page.html',
  styleUrls: ['./profesores.page.scss'],
})
export class ProfesoresPage implements OnInit {

  username: string = 'Invitado';
  
  constructor(
    private router: Router,
    private alertController: AlertController,
    private animationCtrl: AnimationController,
    private menuCtrl: MenuController
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if(state){
      console.log(`Username: ${state['user']}`)
      this.username = state['user']
    }
  }

  ngOnInit() {
  }

  openFirstMenu() {
    this.menuCtrl.open('first-menu');
  }
  ngAfterViewInit() {
    const bienvenida = document.querySelector('#bienvenida');
  
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
  }

}
