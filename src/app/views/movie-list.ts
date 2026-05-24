import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop'; 
import { MoviesService } from '../services/movies-service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  // 1. APRENDIZAJE: Se importa 'RouterLink' de forma explícita porque en componentes standalone
  // cada vista debe declarar qué herramientas usa. Sin esto, el atributo [routerLink] no funcionaría.
  imports: [RouterLink], 
  template: `
    <div class="p-6 max-w-5xl mx-auto">
      <h1 class="text-2xl font-black text-slate-100 uppercase tracking-wider mb-8 border-l-4 border-red-600 pl-3">Catálogo Filmes TPO</h1>
      
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        @for (movie of movies(); track movie.id) {
          
          <div class="bg-white border border-slate-100 p-5 rounded-xl shadow-md flex flex-col justify-between">
            
            <div class="mb-4">
              <h2 class="text-lg font-bold text-slate-900">{{ movie.title }}</h2>
              
              <p class="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">{{ movie.genre }}</p>
            </div>
            
            <a [routerLink]="['/movies', movie.id]" 
               class="bg-red-600 hover:bg-red-700 text-white text-center text-xs font-bold uppercase tracking-widest py-2.5 rounded-lg transition-colors w-full inline-block">
              Ver Ficha
            </a>
            
          </div>
          
        } @empty {
          <p class="text-slate-400 text-center col-span-full py-8">Buscando películas en el servidor...</p>
        }
        
      </div>
    </div>
  `,
  // 5. APRENDIZAJE: 'OnPush' es una estrategia de optimización avanzada. Le dice a Angular: 
  // "No revises este componente buscando cambios de forma automática; solo hazlo si la señal 'movies' emite un nuevo valor".
  // Esto ahorra muchísima memoria y procesamiento en el navegador del usuario.
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class MovieList {
  // 6. APRENDIZAJE: 'inject(MoviesService)' es la forma moderna de inyectar dependencias en Angular,
  // reemplazando al viejo constructor. Trae nuestro mensajero de datos listo para usar en una sola línea limpia.
  private readonly moviesService = inject(MoviesService);

  // 7. APRENDIZAJE: 'toSignal()' toma el Observable (flujo continuo) que devuelve el servicio de internet
  // y lo transforma en una Señal síncrona y amigable para el HTML.
  // Al pasarle '{ initialValue: [] }', forzamos a que la app empiece con una lista vacía en lugar de un 'undefined',
  // evitando que el bucle @for falle antes de recibir la respuesta de la API.
  protected readonly movies = toSignal(this.moviesService.getMovies(), { initialValue: [] });
}