import React, { useEffect, useState } from "react";
import MovieCard from "../../components/movieCard/MovieCard";
import { useMain } from "../../context/MainProvider";
import { MovieListItem } from "../../types/movie";
import { discoverMovies } from "../../services/movieServices";

export default function FavoriteMovies() {
  const { favoriteMovies } = useMain();
  const [movies, setMovies] = useState<MovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await discoverMovies({});
        const favoriteMoviesList = response.results.filter(
          (movie: { id: number }) => favoriteMovies.includes(movie.id),
        );
        setMovies(favoriteMoviesList);
      } catch (error) {
        console.error("Fehler beim Laden der Favoriten:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [favoriteMovies]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="border-primary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="mb-6 text-2xl font-bold">Favorites</h1>

      {movies.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-gray-600">No favorites available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {movies.map((movie: MovieListItem) => (
            <MovieCard
              key={movie.id}
              movieId={movie.id}
              title={movie.title}
              image={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/placeholder.jpg"
              }
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
