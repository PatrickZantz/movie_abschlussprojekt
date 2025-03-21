import React, { createContext, useContext, useEffect, useState } from "react";
import { Genre, MovieListResponse } from "../types/movie";
import { getGenres, getPopularMovies, getTrendingMovies } from "../services/movieServices";

export type MainContextType = {
  genres: Genre[];
  popularMovies: MovieListResponse | null;
  trendingMovies: MovieListResponse | null;
  isLoading: boolean;
  error: Error | null;
  setError: (error: Error | null) => void;
  refreshData: () => Promise<void>;
  selectedGenres: number[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<number[]>>;
  favoriteMovies: number[];
  toggleFavorite: (movieId: number) => void;
  resetFilters: () => void;
  searchString: string;
  setSearchString: (query: string) => void;
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
  favoriteMovies: [],
  toggleFavorite: () => {},
  resetFilters: () => {},
  searchString: '',
  setSearchString: () => {},
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
  const [favoriteMovies, setFavoriteMovies] = useState<number[]>(() => {
    const savedFavorites = localStorage.getItem('favoriteMovies');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [searchString, setSearchString] = useState<string>('');

  const toggleFavorite = (movieId: number) => {
    setFavoriteMovies(prev => {
      const newFavorites = prev.includes(movieId)
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId];
      localStorage.setItem('favoriteMovies', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [popularMoviesData, trendingMoviesData, genresData] = await Promise.all([
        getPopularMovies(),
        getTrendingMovies(),
        getGenres()
      ]);

      setPopularMovies(popularMoviesData);
      setTrendingMovies(trendingMoviesData);
      setGenres(genresData.genres);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset filters when navigating to home
  const resetFilters = () => {
    setSelectedGenres([]);
    setSearchString('');
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
        favoriteMovies,
        toggleFavorite,
        resetFilters,
        searchString,
        setSearchString,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
