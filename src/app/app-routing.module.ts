import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'profesores',
    loadChildren: () => import('./pages/profesores/profesores.module').then( m => m.ProfesoresPageModule)
  },
  {
    path: 'alumnos',
    loadChildren: () => import('./pages/alumnos/alumnos.module').then( m => m.AlumnosPageModule)
  },
  {
    path: 'forget',
    loadChildren: () => import('./pages/forget/forget.module').then( m => m.ForgetPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
