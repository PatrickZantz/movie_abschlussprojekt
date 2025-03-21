import { useEffect, useState } from "react";
import { MovieListItem } from "../../types/movie";
import { searchMovies, discoverMovies } from "../../services/movieServices";
import MovieCard from "../movieCard/MovieCard";
import { useMain } from "../../context/MainProvider";

export default function MovieList() {
  const {
    isLoading: isMainLoading,
    setError,
    searchString,
    selectedGenres,
  } = useMain();
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
          response = await discoverMovies({
            with_genres: selectedGenres.join(","),
          });
        } else {
          response = await discoverMovies({});
        }

        if (!response?.results || response.results.length === 0) {
          setLocalError("Keine Filme gefunden");
          setMovies([]);
        } else {
          setMovies(response.results);
        }
      } catch (error) {
        console.error("Fehler beim Laden der Filme:", error);
        setLocalError("Fehler beim Laden der Filme");
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [searchString, selectedGenres, setError]);

  if (isMainLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      {/* Fehlermeldung */}
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-600">
          <p>{error}</p>
        </div>
      )}

      {/* Film-Liste */}
      {isLoading ? (
        <div className="flex min-h-[200px] items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-red-600"></div>
        </div>
      ) : movies.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-gray-600">Keine Filme gefunden</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {movies.map((movie) => (
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
