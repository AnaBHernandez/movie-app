// src/app/views/home.ts
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `<h1 class="text-3xl font-extrabold text-slate-800 p-6">Bienvenido al Catálogo de Películas</h1>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {}