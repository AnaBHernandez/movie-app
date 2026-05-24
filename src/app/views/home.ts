import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div class="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-sm">
        🎬
      </div>
      
      <h1 class="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl max-w-lg">
        Bienvenido al Catálogo de Películas
      </h1>
      
      <p class="mt-4 text-lg text-slate-500 max-w-md font-medium">
        Gestiona, explora y analiza tus contenidos cinematográficos favoritos conectados en tiempo real a nuestra API reactiva.
      </p>
      
      <div class="mt-8">
        <a routerLink="/movies" 
           class="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-indigo-100 transition-all hover:-translate-y-0.5">
          Explorar Películas →
        </a>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {}