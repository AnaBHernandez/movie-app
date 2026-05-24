import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Conservamos solo el portal principal

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // Limpio de RouterLink y RouterLinkActive
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {}