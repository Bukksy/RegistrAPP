import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ToastController } from '@ionic/angular';
import { Animation, AnimationController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  username: string = '';
  password: string = '';
  welcomeMessage: string;

  tituloMain: string;

  constructor
  (
    private router: Router, 
    private toastController: ToastController,
    private loginService: LoginService,
    private animationCtrl: AnimationController
  ) {
    this.tituloMain= 'RegistrAPP'
    this.welcomeMessage= 'Bienvenido'
  }

  ngAfterViewInit() {
    const formulario = document.querySelector('#formulario');
  
    if (formulario) {
      const animationFormulario: Animation = this.animationCtrl.create()
        .addElement(formulario)
        .duration(1000)
        .easing('ease-in-out')
        .fromTo('opacity', '0', '1')
        .fromTo('transform', 'translateY(50px)', 'translateY(0px)');
  
      animationFormulario.play();
    } else {
      console.log('Error en la animacion')
    }
  }

  validateLogin() {
    console.log("Ejecutando validación!");

    const loginResult = this.loginService.validateLogin(this.username, this.password);

    if (loginResult) {
      this.showToastMessage('Inicio de sesión válido', 'success');
      this.welcomeMessage = `Bienvenido ${this.username}`;

      const extras = this.createExtrasUser(this.username);

      if (this.isAlumno()) {
        this.router.navigate(['/alumnos'], extras);
      } else {
        this.router.navigate(['/profesores'], extras);
      }

    } else {
      this.showToastMessage('Inicio de sesión inválido', 'danger');
    }
  }

  isAlumno(): boolean {
    return this.loginService.users.some(user => user.username === this.username);
  }

  createExtrasUser(u: string): NavigationExtras | undefined {
    return {
      state: {
        user: u
      }
    }
  }

  recuperarPassword(){
    console.log("Ejecutando Recuperacion");
    this.router.navigate(['/forget'])
  }
  


  async showToastMessage(text: string, msgColor: string){
    const toast = await this.toastController.create({
      message: text,
      color: msgColor,
      position: 'bottom',
      duration: 3000
    })
    toast.present();
  }
}
