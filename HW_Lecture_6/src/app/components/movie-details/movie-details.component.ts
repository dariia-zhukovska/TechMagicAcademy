import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IMovie } from 'src/app/models/movie.interface';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  public movie: any;
  public imgUrl: string;
  private routeSub: any;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {
    this.imgUrl = environment.IMG_URL
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.movieService.getMovie(params['id'])
        .subscribe((movie: IMovie) => {
          this.movie = movie;
        });
    });
  }






}

