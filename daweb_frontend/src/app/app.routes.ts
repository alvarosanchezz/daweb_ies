import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'alumnos',
    loadComponent: () => import('./components/alumno-list/alumno-list.component').then(m => m.AlumnoListComponent)
  },
  {
    path: 'profesores',
    loadComponent: () => import('./components/profesor-list/profesor-list.component').then(m => m.ProfesorListComponent)
  },
  {
    path: 'asignaturas',
    loadComponent: () => import('./components/asignatura-list/asignatura-list.component').then(m => m.AsignaturaListComponent)
  },
  {
    path: 'matriculas',
    loadComponent: () => import('./components/matricula-list/matricula-list.component').then(m => m.MatriculaListComponent)
  },
  { path: '**', redirectTo: 'home' }
];
