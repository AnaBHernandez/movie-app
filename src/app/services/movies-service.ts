import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root' // Patrón Singleton: existe una única instancia de este servicio para toda la app.
})
export class MoviesService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/movies'; // Centralizar la URL evita repetir texto si cambia la API.

  // Devuelve un Observable. No trae los datos de golpe, sino que prepara la tubería 
  // para cuando el componente decida suscribirse a ella.
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl).pipe(
      catchError(this.handleError) // Si la API está caída, interceptamos el fallo aquí.
    );
  }

  getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Centraliza la gestión de fallos. Convierte errores crudos de red en mensajes 
  // legibles en la consola para facilitar la depuración al desarrollador.
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error inesperado';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error local: ${error.error.message}`;
    } else {
      errorMessage = `Error del servidor (Código ${error.status}): ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage)); // Propaga el error de forma ordenada.
  }
}