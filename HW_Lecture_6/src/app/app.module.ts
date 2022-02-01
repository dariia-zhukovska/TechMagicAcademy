import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieService } from './services/movie.service';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AboutComponent } from './components/about/about.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { HeaderComponent } from './components/header/header.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
// import { FormContainerComponent } from './components/form-container/form-container.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    MoviesListComponent,
    HeaderComponent,
    MovieDetailsComponent,
    SearchFormComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    MovieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
