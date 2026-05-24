import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/layout').then(m => m.Layout),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('./views/home').then(m => m.Home)
      },
      {
        path: 'movies',
        loadComponent: () => import('./views/movie-list').then(m => m.MovieList)
      },
      {
        path: 'movies/:movieId',
        loadComponent: () => import('./views/movie-details').then(m => m.MovieDetails)
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./views/not-found').then(m => m.NotFound)
  }
];