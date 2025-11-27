export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  backdrop_path?: string;
}

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  production_companies: { name: string }[];
  tagline: string;
  runtime: number;
  original_language: string;
  vote_count: number;
  homepage?: string;
  imdb_id?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  savedMovies: number[];
}

// Adicione esta interface
export interface MoviesResponse {
  movies: Movie[];
  totalPages: number;
  currentPage: number;
  totalResults: number;
}