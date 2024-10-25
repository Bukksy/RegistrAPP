import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    const expectedUserType = route.data['userType'];

    if (expectedUserType === 'alumno' && this.loginService.isAlumno()) {
      return true; // Permitir acceso a los alumnos
    } else if (expectedUserType === 'profesor' && this.loginService.isProfesor()) {
      return true; // Permitir acceso a los profesores
    } else {
      this.router.navigate(['/no-access']); // Redirige si el usuario no tiene permiso
      return false;
    }
  }
}
