import React, { useEffect, useState } from 'react';
import MovieCard from '../../components/movieCard/MovieCard';
import { useMain } from '../../context/MainProvider';
import { MovieListItem } from '../../types/movie';
import { discoverMovies } from '../../services/movieServices';

export default function FavoriteMovies() {
  const { favoriteMovies } = useMain();
  const [movies, setMovies] = useState<MovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await discoverMovies({});
        const favoriteMoviesList = response.results.filter(movie => 
          favoriteMovies.includes(movie.id)
        );
        setMovies(favoriteMoviesList);
      } catch (error) {
        console.error('Fehler beim Laden der Favoriten:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [favoriteMovies]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Meine Favoriten</h1>

      {movies.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Keine Favoriten hinzugefügt</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie: MovieListItem) => (
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
