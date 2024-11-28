import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

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
    canActivate: [AuthGuard],
    data: { userType: 'profesor' }
  },
  {
    path: 'alumnos',
    loadChildren: () => import('./pages/alumnos/alumnos.module').then(m => m.AlumnosPageModule), 
    canActivate: [AuthGuard],
    data: { userType: 'alumno' }
  },
  {
    path: 'forget',
    loadChildren: () => import('./pages/forget/forget.module').then(m => m.ForgetPageModule)
  },
  {
    path: 'alumnos/perfil',
    loadChildren: () => import('./pages/alumnos/perfil/perfil.module').then(m => m.PerfilPageModule), 
    canActivate: [AuthGuard],
    data: { userType: 'alumno' }
  },
  {
    path: 'alumnos/asignaturas',
    loadChildren: () => import('./pages/alumnos/asignaturas/asignaturas.module').then(m => m.AsignaturasPageModule), 
    canActivate: [AuthGuard],
    data: { userType: 'alumno' }
  },
  {
    path: 'alumnos/asistencia',
    loadChildren: () => import('./pages/alumnos/asistencia/asistencia.module').then(m => m.AsistenciaPageModule), 
    canActivate: [AuthGuard],
    data: { userType: 'alumno' }
  },
  { path: 'alumnos/qrscan', 
    loadChildren: () => import('./pages/alumnos/qrscan/qrscan.module').then(m => m.QrscanPageModule) },
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
