import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnosPage } from './alumnos.page';

const routes: Routes = [
  {
    path: '',
    component: AlumnosPage,
    children: [
      {
        path: 'perfil-alumno',
        loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: 'ver-asignaturas',
        loadChildren: () => import('./asignaturas/asignaturas.module').then(m => m.AsignaturasPageModule)
      },
      {
        path: 'registrar-asistencia',
        loadChildren: () => import('./asistencia/asistencia.module').then(m => m.AsistenciaPageModule)
      },
      {
        path: '',
        redirectTo: 'perfil',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnosPageRoutingModule {}
