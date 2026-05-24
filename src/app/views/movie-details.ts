import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router'; 
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, catchError, filter, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { MoviesService } from '../services/movies-service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="p-6 max-w-xl mx-auto">
      
      @if (movie()) {
        <div class="bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-xl">🎬</div>
            <div>
              <h1 class="text-2xl font-black text-slate-900">{{ movie()?.title }}</h1>
              <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">{{ movie()?.genre }}</span>
            </div>
          </div>

          <div class="space-y-3 my-6 border-t border-b border-slate-100 py-4">
            <p class="text-slate-700">
              <span class="font-bold text-slate-500 block text-xs uppercase tracking-wider">Dirección</span>
              <span class="text-base font-medium text-slate-900">{{ movie()?.director }}</span>
            </p>
            <p class="text-slate-700">
              <span class="font-bold text-slate-500 block text-xs uppercase tracking-wider">Año de Estreno</span>
              <span class="text-base font-medium text-slate-900">{{ movie()?.year }}</span>
            </p>
          </div>

          <a routerLink="/movies" class="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors w-full justify-center">
            ← Volver al listado
          </a>
        </div>
      } 
      
      @else if (movie() === null) {
        <div class="text-center py-12 bg-red-50 border border-red-200 rounded-2xl p-6 shadow-sm">
          <div class="text-3xl mb-2">⚠️</div>
          <h2 class="text-lg font-bold text-red-800">Película no encontrada</h2>
          <p class="text-sm text-red-600 mt-1">El servidor respondió bien, pero no existe ningún filme con este ID en 'db.json'.</p>
          <a routerLink="/movies" class="mt-4 inline-block text-sm font-medium text-indigo-600 hover:underline">← Regresar al catálogo</a>
        </div>
      } 
      
      @else {
        <div class="text-center py-12 text-slate-500 bg-white rounded-2xl shadow border border-slate-100 p-6">
          <p class="font-bold text-indigo-600 animate-pulse">Sincronizando con la base de datos...</p>
        </div>
      }

    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetails {
  private readonly moviesService = inject(MoviesService);
  private readonly route = inject(ActivatedRoute); // Nos permite escuchar los cambios en la barra de direcciones.

  // Construimos una tubería reactiva encadenando operadores de RxJS:
  protected readonly movie = toSignal(
    this.route.paramMap.pipe(
      
      // 1. Mapeo seguro: Extraemos el parámetro. Añadir '|| ' asegura que si la URL no tiene parámetro, 
      // devuelva un texto vacío en lugar de un 'null', cumpliendo el tipado estricto de TypeScript.
      map(params => params.get('id') || params.get('movieId') || ''),
      
      // 2. Filtro de contención: Evita que el componente dispare una petición HTTP absurda a la API 
      // si el parámetro inicial de la URL es un texto indefinido o vacío mientras el enrutador se inicializa.
      filter(movieId => movieId !== '' && movieId !== 'undefined'),
      
      // 3. Conmutación: Recibe el ID limpio. switchMap cancela automáticamente la petición HTTP anterior 
      // si el usuario hace clic muy rápido en otra película antes de que el servidor termine de responder.
      switchMap(movieId => 
        this.moviesService.getMovieById(movieId).pipe(
          // 4. Paracaídas local: Si el servidor devuelve un 404, capturamos el error aquí dentro 
          // y emitimos 'null'. Esto evita que la señal global se rompa y congela la pantalla en carga.
          catchError(() => of(null))
        )
      )
    )
  );
}