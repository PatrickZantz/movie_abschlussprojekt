import React from 'react';
import MovieCard from '../../components/movieCard/MovieCard';
import { useMain } from '../../context/MainProvider';
import { MovieListItem } from '../../types/movie';

export default function FavoriteMovies() {
  const { popularMovies, favoriteMovies } = useMain();

  // Filtere die beliebten Filme nach den favorisierten IDs
  const favoriteMoviesList = popularMovies?.results.filter(movie => 
    favoriteMovies.includes(movie.id)
  ) || [];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Meine Favoriten</h1>

      {favoriteMoviesList.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Keine Favoriten hinzugefügt</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favoriteMoviesList.map((movie: MovieListItem) => (
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
