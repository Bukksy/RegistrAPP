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
  carrera: string = '';
  correo: string = '';
  welcomeMessage: string;
  tituloMain: string;

  constructor(
    private router: Router, 
    private toastController: ToastController,
    private loginService: LoginService,
    private animationCtrl: AnimationController
  ) {
    this.tituloMain = 'RegistrAPP';
    this.welcomeMessage = 'Bienvenido';
    
    // Cargar datos de usuario si están en localStorage
    this.loadUserData();
  }

  ngAfterViewInit() {
    this.animateForm();
  }

  private loadUserData() {
    // Cargar datos del usuario desde localStorage
    const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    if (userData && userData.username) {
        this.username = userData.username; // Cargar el username del localStorage
        this.carrera = userData.carrera || ''; // Cargar la carrera si existe
        this.correo = userData.correo || ''; // Cargar el correo si existe
    } else {
        // Reiniciar los datos si no hay información guardada
        this.username = '';
        this.carrera = '';
        this.correo = '';
    }
}


  private animateForm() {
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
      console.log('Error en la animación');
    }
  }

  validateLogin() {
    console.log("Ejecutando validación!");

    const loginResult = this.loginService.validateLogin(this.username, this.password);

    if (loginResult.valid) {
        this.showToastMessage('Inicio de sesión válido', 'success');
        this.welcomeMessage = `Bienvenido ${this.username}`; 

        const userData = { 
            username: this.username,  // Este debe ser el username ingresado por el usuario
            carrera: loginResult.carrera, 
            correo: loginResult.correo 
        };

        // Guardar datos del usuario en localStorage
        localStorage.setItem('currentUser', JSON.stringify(userData)); 

        // Crear objeto de navegación para pasar al siguiente componente
        const extras = this.createExtrasUser(this.username, loginResult.carrera, [], loginResult.correo);

        // Redirigir según el tipo de usuario
        if (this.isAlumno()) {
            this.router.navigate(['/alumnos'], extras);
        } else if (this.isProfesor()) {
            this.router.navigate(['/profesores'], extras);
        } else {
            this.showToastMessage('Tipo de usuario no reconocido', 'danger');
        }

    } else {
        this.showToastMessage('Inicio de sesión inválido', 'danger');
    }
}


  isAlumno(): boolean {
    return this.loginService.users.some(user => user.username === this.username);
  }

  isProfesor(): boolean {
    return this.loginService.profesores.some(user => user.username === this.username);
  }

  createExtrasUser(u: string, carrera?: string, asignaturas?: string[], correo?: string): NavigationExtras | undefined {
    return {
      state: {
        user: u,
        carrera: carrera,
        asignaturas: asignaturas || [],
        correo: correo
      }
    };
  }

  recuperarPassword() {
    console.log("Ejecutando Recuperación");
    this.router.navigate(['/forget']);
  }

  async showToastMessage(text: string, msgColor: string) {
    const toast = await this.toastController.create({
      message: text,
      color: msgColor,
      position: 'bottom',
      duration: 3000
    });
    await toast.present();
  }
}
