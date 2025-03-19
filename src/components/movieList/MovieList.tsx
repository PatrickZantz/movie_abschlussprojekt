import React, { useContext } from 'react';
import { MainContext } from '../../context/MainProvider';
import MovieCard from '../movieCard/MovieCard';

export default function MovieList() {
  const { allMovies } = useContext(MainContext);

  if (!allMovies.results || allMovies.results.length === 0) {
    return <div>Lade Filme...</div>;
  }

  return (
    <div className="flex flex-wrap gap-4">
      {allMovies.results.map((movie: { id: React.Key | null | undefined; title: string; poster_path: any; vote_average: number; duration: string; release_date: string; genre_ids: string; }) => (
        <MovieCard 
          key={movie.id}
          title={movie.title}
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          rating={movie.vote_average}
          date={movie.release_date} 
          genre={movie.genre_ids}        
          duration={movie.duration} 
        />
      ))}
    </div>
  );
}
