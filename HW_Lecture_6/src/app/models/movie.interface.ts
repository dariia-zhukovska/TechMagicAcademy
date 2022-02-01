export interface IMovie {
  id: number;
  vote_average: number;
  title: string;
  release_date: string;
  budget: number;
  poster_path: string;
  runtime: number;
}

export interface IPopularMovies {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
