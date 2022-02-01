import { Component, OnInit } from '@angular/core';
import { IMovie, IPopularMovies } from 'src/app/models/movie.interface';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  public movies: IMovie[];
  public originalMovies: IMovie[];

  constructor(private movieServise: MovieService) {
    this.movies = [];
    this.originalMovies = [];
  }

  ngOnInit(): void {
    this.movieServise.getPopularMovies()
      .subscribe((movies: IPopularMovies) => {
        this.originalMovies = movies.results;
        this.movies = this.originalMovies;
      });
  }

  filterMovies(e: any) {
    const searchValue = e.search;

    this.movies = this.originalMovies.filter((movie) => {
      return movie.title?.toLowerCase().includes(searchValue.toLowerCase());
    });
    console.log(e);
  }
}
