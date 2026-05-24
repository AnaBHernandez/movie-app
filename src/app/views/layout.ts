import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen bg-zinc-950 flex flex-col font-sans antialiased text-zinc-200">
      
      <nav class="bg-red-600 text-white px-6 py-4 shadow-xl sticky top-0 z-50">
        <div class="max-w-5xl mx-auto flex items-center justify-between">
          
          <a routerLink="/" class="text-xl font-black tracking-tighter uppercase">
            FILM-TPO
          </a>
          
          <div class="flex items-center gap-6 text-xs font-black uppercase tracking-wider">
            <a routerLink="/home" routerLinkActive="text-zinc-900" class="hover:text-zinc-100 transition-colors">Inicio</a>
            <a routerLink="/movies" routerLinkActive="text-zinc-900" class="hover:text-zinc-100 transition-colors">Películas</a>
          </div>
          
        </div>
      </nav>

      <main class="flex-grow max-w-5xl mx-auto w-full p-6 md:p-8 bg-transparent">
        <router-outlet></router-outlet>
      </main>

      <footer class="border-t border-zinc-900 py-6 text-center text-xs text-zinc-600 mt-auto">
        &copy; 2026 Ecosistema Film-TPO. Todos los derechos reservados.
      </footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Layout {}