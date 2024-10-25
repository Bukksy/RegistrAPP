import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'profesores',
    loadChildren: () => import('./pages/profesores/profesores.module').then(m => m.ProfesoresPageModule), 
  },
  {
    path: 'alumnos',
    loadChildren: () => import('./pages/alumnos/alumnos.module').then(m => m.AlumnosPageModule), 
  },
  {
    path: 'forget',
    loadChildren: () => import('./pages/forget/forget.module').then(m => m.ForgetPageModule)
  },
  {
    path: 'alumnos/perfil',
    loadChildren: () => import('./pages/alumnos/perfil/perfil.module').then(m => m.PerfilPageModule), 
  },
  {
    path: 'alumnos/asignaturas',
    loadChildren: () => import('./pages/alumnos/asignaturas/asignaturas.module').then(m => m.AsignaturasPageModule), 
  },
  {
    path: 'alumnos/asistencia',
    loadChildren: () => import('./pages/alumnos/asistencia/asistencia.module').then(m => m.AsistenciaPageModule), 
  },
  {
    path: '404',
    loadChildren: () => import('./pages/not-found/not-found.module').then( m => m.NotFoundPageModule)
  },
  {
    path: '**', 
    redirectTo: '/404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
