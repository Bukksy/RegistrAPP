import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  username!: string;
  correo!: string;
  password!: string;
  userType: 'alumno' | 'profesor' = 'alumno';

  constructor(private loginService: LoginService, private router: Router) {}

  registerUser() {
    if (this.userType === 'alumno') {
      this.loginService.registerStudent(this.username, this.correo, this.password);
    } else {
      this.loginService.registerProfessor(this.username, this.correo, this.password);
    }
    alert('Usuario registrado con éxito');
    this.router.navigate(['home']); 
  }
}
