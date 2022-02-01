import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { IMovie } from '../../models/movie.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public imgUrl: string;
  public movie: any;

  constructor(private movieService: MovieService) {
    this.imgUrl = environment.IMG_URL;
  }

  ngOnInit(): void {
    this.movieService.getMovie(113)
      .subscribe((movie: IMovie) => {
        this.movie = movie;
      });
    console.log(this);

  }
}
