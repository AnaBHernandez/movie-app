import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MoviesService } from '../services/movies-service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="p-6 max-w-4xl mx-auto">
      <h1 class="text-3xl font-black text-slate-800 mb-6">Catálogo Filmes TPO</h1>
      <div class="grid gap-4 md:grid-cols-2">
        @for (movie of moviesService.movies(); track movie.id) {
          <div class="bg-white p-5 rounded-xl shadow border border-slate-100 flex justify-between items-center">
            <div>
              <h2 class="text-xl font-bold text-slate-900">{{ movie.title }}</h2>
              <p class="text-sm text-slate-500">{{ movie.genre }}</p>
            </div>
            <a [routerLink]="['/movies', movie.id]" 
               class="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
              Ver Ficha
            </a>
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieList {
  protected readonly moviesService = inject(MoviesService);
}