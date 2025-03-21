import React, { createContext, useContext, useEffect, useState } from "react";
import { Genre, MovieListResponse } from "../types/movie";
import { getGenres, getPopularMovies, getTrendingMovies } from "../services/movieServices";

type MainContextType = {
  genres: Genre[];
  popularMovies: MovieListResponse | null;
  trendingMovies: MovieListResponse | null;
  isLoading: boolean;
  error: Error | null;
  setError: (error: Error | null) => void;
  refreshData: () => Promise<void>;
  selectedGenres: number[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<number[]>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  favoriteMovies: number[];
  toggleFavorite: (movieId: number) => void;
};

const defaultContextValue: MainContextType = {
  genres: [],
  popularMovies: null,
  trendingMovies: null,
  isLoading: true,
  error: null,
  setError: () => {},
  refreshData: async () => {},
  selectedGenres: [],
  setSelectedGenres: () => {},
  searchQuery: '',
  setSearchQuery: () => {},
  favoriteMovies: [],
  toggleFavorite: () => {},
};

export const MainContext = createContext<MainContextType>(defaultContextValue);

/**
 * Custom Hook für den Zugriff auf den MainContext
 */
export const useMain = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error('useMain muss innerhalb eines MainProviders verwendet werden');
  }
  return context;
};

export default function MainProvider({ children }: { children: React.ReactNode }) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [popularMovies, setPopularMovies] = useState<MovieListResponse | null>(null);
  const [trendingMovies, setTrendingMovies] = useState<MovieListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favoriteMovies, setFavoriteMovies] = useState<number[]>([]);

  const toggleFavorite = (movieId: number) => {
    setFavoriteMovies(prev => {
      if (prev.includes(movieId)) {
        return prev.filter(id => id !== movieId);
      } else {
        return [...prev, movieId];
      }
    });
  };

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Starte Datenladen...');

      const [genresData, popularData, trendingData] = await Promise.all([
        getGenres(),
        getPopularMovies(),
        getTrendingMovies(),
      ]);

      console.log('Alle Daten erfolgreich geladen');
      setGenres(genresData.genres);
      setPopularMovies(popularData);
      setTrendingMovies(trendingData);
    } catch (err) {
      console.error('Fehler beim Laden der Daten:', err);
      if (err instanceof Error) {
        console.error('Fehlermeldung:', err.message);
        setError(err);
      } else {
        const error = new Error('Ein unbekannter Fehler ist aufgetreten');
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <MainContext.Provider
      value={{
        genres,
        popularMovies,
        trendingMovies,
        isLoading,
        error,
        setError,
        refreshData: loadData,
        selectedGenres,
        setSelectedGenres,
        searchQuery,
        setSearchQuery,
        favoriteMovies,
        toggleFavorite,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
