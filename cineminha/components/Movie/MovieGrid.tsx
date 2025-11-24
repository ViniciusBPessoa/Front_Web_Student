import { Movie } from '@/types/movie';
import MovieCard from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  onSaveMovie: (movieId: number) => void;
  onShowDetails: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSaveMovie, onShowDetails }: MovieGridProps) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {movies.map((movie) => (
        <MovieCard 
          key={movie.id}
          movie={movie}
          onSave={onSaveMovie}
          onDetails={onShowDetails}
        />
      ))}
    </div>
  );
}