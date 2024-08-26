import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'browse', loadComponent: () => import('./pages/browse/browse.component').then(m => m.BrowseComponent) }
];
