import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ToastController } from '@ionic/angular';
import { Animation, AnimationController } from '@ionic/angular';
import { WeatherService } from '../services/weather.service';  // Importa el WeatherService

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit { 
  username: string = '';
  password: string = '';
  carrera: string = '';
  correo: string = '';
  welcomeMessage: string;
  tituloMain: string;
  weatherData: any;  
  city: string = 'Santiago,CL';  // Ciudad predeterminada, puedes cambiarla dinámicamente

  constructor(
    private router: Router,
    private toastController: ToastController,
    private loginService: LoginService,
    private animationCtrl: AnimationController,
    private weatherService: WeatherService 
  ) {
    this.tituloMain = 'RegistrAPP';
    this.welcomeMessage = 'Bienvenido';
    this.loadUserData();
  }

  ngOnInit() {
    this.getWeather(); 
  }

  ngAfterViewInit() {
    this.animateForm();
  }

  private loadUserData() {
    const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    if (userData && userData.username) {
        this.username = userData.username; 
        this.carrera = userData.carrera || '';
        this.correo = userData.correo || ''; 
    } else {
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
            username: this.username,  
            carrera: loginResult.carrera, 
            correo: loginResult.correo 
        };
        localStorage.setItem('currentUser', JSON.stringify(userData)); 
        const extras = this.createExtrasUser(this.username, loginResult.carrera, [], loginResult.correo);

        if (this.isAlumno()) {
            this.router.navigate(['/alumnos/inicio'], extras);
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
    return this.loginService.users && this.loginService.users.some(user => user.username === this.username);
  }
  
  isProfesor(): boolean {
    return this.loginService.profesores && this.loginService.profesores.some(user => user.username === this.username);
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

  getWeather() {
    this.weatherService.getWeather(this.city).subscribe(
      (data) => {
        console.log('Datos del clima:', data);
        this.weatherData = data;  // Almacena los datos del clima
      },
      (error) => {
        console.error('Error al obtener el clima:', error);
        this.showToastMessage('Error al obtener el clima', 'danger');
      }
    );
  }
}
