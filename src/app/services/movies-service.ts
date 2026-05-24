import { Injectable, signal } from '@angular/core';
import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private readonly data = signal<Movie[]>([
    { id: '1', title: 'El Señor de los Anillos', director: 'Peter Jackson', genre: 'Fantasía' },
    { id: '2', title: 'Blade Runner 2049', director: 'Denis Villeneuve', genre: 'Ciencia Ficción' },
    { id: '3', title: 'El Padrino', director: 'Francis Ford Coppola', genre: 'Drama' }
  ]);

  get movies() {
    return this.data.asReadonly();
  }

  getMovieById(id: string): Movie | undefined {
    return this.data().find(m => m.id === id);
  }
}