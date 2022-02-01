import { environment } from '../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { IMovie, IPopularMovies } from '../models/movie.interface';
import { Observable } from 'rxjs';


@Injectable()
export class MovieService {
  constructor(private httpClient: HttpClient) { }

  public getMovie(movieId: number): Observable<IMovie> {
    return this.httpClient.get<IMovie>(`${environment.BASE_URL}/movie/${movieId}`);
  }

  public getPopularMovies(): Observable<IPopularMovies> {
    return this.httpClient.get<IPopularMovies>(`${environment.BASE_URL}/movie/popular`);
  }
}



