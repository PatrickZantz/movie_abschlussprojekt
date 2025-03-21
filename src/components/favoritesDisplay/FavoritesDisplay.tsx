import React, { useEffect, useState } from 'react';
import { MovieListItem } from '../../types/movie';

interface FavoritesDisplayProps {
  favoriteMovieIds: number[];
  allMovies: MovieListItem[];
}

const FavoritesDisplay: React.FC<FavoritesDisplayProps> = ({
  favoriteMovieIds,
  allMovies,
}) => {
  const [favoriteMovies, setFavoriteMovies] = useState<MovieListItem[]>([]);

  useEffect(() => {
    const filteredMovies = allMovies.filter((movie) =>
      favoriteMovieIds.includes(movie.id)
    );
    setFavoriteMovies(filteredMovies);
  }, [allMovies, favoriteMovieIds]);

  return (
    <div>
      <h2>Lieblingsfilme</h2>
      <ul>
        {favoriteMovies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesDisplay;
