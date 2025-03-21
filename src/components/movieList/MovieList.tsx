import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MovieListItem } from '../../types/movie';
import { getPopularMovies, searchMovies } from '../../services/movieServices';
import MovieCard from '../movieCard/MovieCard';
import { useMain } from '../../context/MainProvider';

export default function MovieList() {
  const navigate = useNavigate();
  const { popularMovies, isLoading: isMainLoading, setError, searchQuery } = useMain();
  const [movies, setMovies] = useState<MovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setLocalError(null);
      try {
        let response;
        if (searchQuery) {
          response = await searchMovies(searchQuery);
        } else {
          response = popularMovies;
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
  }, [searchQuery, popularMovies, setError]);

  if (isMainLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        {searchQuery ? `Suchergebnisse für "${searchQuery}"` : 'Beliebte Filme'}
      </h1>

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
            <div
              key={movie.id}
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="cursor-pointer transform transition-transform hover:scale-105"
            >
              <MovieCard
                title={movie.title}
                image={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.jpg'}
                rating={movie.vote_average}
                date={movie.release_date}
                genre={movie.genre_ids}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
