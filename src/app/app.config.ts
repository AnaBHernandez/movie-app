import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; 
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Desactiva Zone.js. Ahora Angular 21 depende de las Señales para saber 
    // exactamente qué parte de la pantalla tiene que actualizar, siendo más rápido.
    provideZonelessChangeDetection(),
    
    provideRouter(routes, withComponentInputBinding()),
    
    // Habilita el servicio de red en toda la aplicación. Sin esto, cualquier intento 
    // de usar HttpClient en un servicio lanzará un error en tiempo de ejecución.
    provideHttpClient() 
  ]
};