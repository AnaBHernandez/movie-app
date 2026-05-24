import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  template: `<h1 class="text-3xl font-extrabold text-red-600 p-6">Error 404: La página solicitada no existe</h1>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFound {}