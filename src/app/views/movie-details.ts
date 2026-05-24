import { Component, ChangeDetectionStrategy, inject, input, computed } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from '../services/movies-service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  template: `
    <div class="p-6 max-w-2xl mx-auto">
      @if (movie()) {
        <div class="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
          <span class="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{{ movie()?.genre }}</span>
          <h1 class="text-4xl font-black text-slate-950 mt-3 mb-2">{{ movie()?.title }}</h1>
          <p class="text-slate-700 font-medium mb-6">Dirección: <span class="text-slate-900 font-bold">{{ movie()?.director }}</span></p>
          
          <button (click)="goBack()" 
                  class="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm">
            ← Volver al listado
          </button>
        </div>
      } @else {
        <div class="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
          <p class="text-amber-800 font-bold">Película no localizada en los registros del catálogo.</p>
          <button (click)="goBack()" class="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-800 underline">Regresar inmediatamente</button>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetails {
  private readonly moviesService = inject(MoviesService);
  private readonly router = inject(Router);

  // Parámetro mapeado automáticamente desde URL por el Router de Angular 21
  movieId = input.required<string>();

  // Señal computada síncrona reactiva libre de subscripciones manuales
  protected readonly movie = computed(() => this.moviesService.getMovieById(this.movieId()));

  goBack(): void {
    this.router.navigate(['/movies']);
  }
}