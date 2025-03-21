import { useEffect, useState } from 'react';
import { MovieListItem } from '../../types/movie';
import { searchMovies, discoverMovies } from '../../services/movieServices';
import MovieCard from '../movieCard/MovieCard';
import { useMain } from '../../context/MainProvider';

export default function MovieList() {
  const { isLoading: isMainLoading, setError, searchString, selectedGenres } = useMain();
  const [movies, setMovies] = useState<MovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setLocalError(null);
      try {
        let response;
        if (searchString) {
          response = await searchMovies(searchString);
        } else if (selectedGenres.length > 0) {
          response = await discoverMovies({ with_genres: selectedGenres.join(',') });
        } else {
          response = await discoverMovies({});
        }

        if (!response?.results || response.results.length === 0) {
          setLocalError('Keine Filme gefunden');
          setMovies([]);
        } else {
          setMovies(response.results);
        }
      } catch (error) {
        console.error('Fehler beim Laden der Filme:', error);
        setLocalError('Fehler beim Laden der Filme');
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [searchString, selectedGenres, setError]);

  if (isMainLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Fehlermeldung */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          <p>{error}</p>
        </div>
      )}

      {/* Film-Liste */}
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Keine Filme gefunden</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movieId={movie.id}
              title={movie.title}
              image={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.jpg'}
              rating={movie.vote_average}
              date={movie.release_date}
              genre={movie.genre_ids}
            />
          ))}
        </div>
      )}
    </div>
  );
}
