import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  isProfileActive(): boolean {
    return this.router.url === '/alumnos/perfil';
  }

}
