import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IMovie } from 'src/app/models/movie.interface';


@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  @Output() changed: EventEmitter<IMovie>;
  public searchMovieForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.changed = new EventEmitter();
    this.searchMovieForm = {} as FormGroup;
  }

  ngOnInit(): void {
    this.searchMovieForm = this.formBuilder.group({
      search: "",
    })
  }

  public searchMovie(formValue: any): void {
    this.changed.emit(formValue);
  }

  get title() {
    return this.searchMovieForm.get('title');
  }
}





