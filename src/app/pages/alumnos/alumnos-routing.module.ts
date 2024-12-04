import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnosPage } from './alumnos.page';

const routes: Routes = [
  {
    path: '',
    component: AlumnosPage,
    children: [
      {
        path: 'inicio',  
        loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioPageModule)
      },
      {
        path: 'perfil-alumno',
        loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: 'asignaturas',
        loadChildren: () => import('./asignaturas/asignaturas.module').then(m => m.AsignaturasPageModule)
      },
      {
        path: 'asistencia',
        loadChildren: () => import('./asistencia/asistencia.module').then(m => m.AsistenciaPageModule)
      },
      {
        path: 'qrscan',
        loadChildren: () => import('./qrscan/qrscan.module').then(m => m.QrscanPageModule),
      },
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnosPageRoutingModule {}
