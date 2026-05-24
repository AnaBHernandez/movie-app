import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="bg-slate-900 text-white p-4 flex gap-6 items-center shadow-lg">
      <span class="text-xl font-black tracking-wider text-indigo-400 mr-4">FILM-TPO</span>
      
      <a routerLink="/home" 
         routerLinkActive="text-indigo-400 font-bold underline decoration-2 underline-offset-8" 
         [routerLinkActiveOptions]="{ exact: true }"
         class="hover:text-slate-300 transition-colors duration-200">Inicio</a>
         
      <a routerLink="/movies" 
         routerLinkActive="text-indigo-400 font-bold underline decoration-2 underline-offset-8"
         class="hover:text-slate-300 transition-colors duration-200">Películas</a>
    </nav>

    <main class="container mx-auto mt-6 px-4 min-h-[70vh]">
      <router-outlet></router-outlet>
    </main>

    <footer class="bg-slate-100 border-t border-slate-200 text-center p-4 mt-12 text-xs text-slate-500 font-medium">
      &copy; 2026 Ecosistema Film-TPO. Todos los derechos reservados.
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Layout {}