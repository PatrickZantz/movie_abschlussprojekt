import React, { createContext, useEffect, useState } from "react";
import { fetchAllMovies } from "../services/fetchAllMovies"; // Erstellen Sie diese Funktion
import { fetchTrendingData } from "../services/fetchTrendingData";
import { fetchGenres } from "../services/fetchGenres";
import { fetchGenreFilteredMovies } from "../services/fetchGenreFilteredMovies";
import { searchMovies } from "../services/searchMovies";

type MainContextType = {
  genres: any[]; // Zustand für Genres
  setGenres: React.Dispatch<React.SetStateAction<any[]>>; // Setter für Genres
  trendingData: any; // Zustand für Trending-Daten
  setTrendingData: React.Dispatch<React.SetStateAction<any>>; // Setter für Trending-Daten
  allMovies: any;
  setAllMovies: React.Dispatch<React.SetStateAction<any>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedGenres: any[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<any[]>>;
  filteredMovies: any[];
  setFilteredMovies: React.Dispatch<React.SetStateAction<any[]>>;
};

const defaultContextValue: MainContextType = {
  genres: [],
  setGenres: () => {},
  trendingData: {},
  setTrendingData: () => {},
  allMovies: {},
  setAllMovies: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
  selectedGenres: [],
  setSelectedGenres: () => {},
  filteredMovies: [],
  setFilteredMovies: () => {},
};

export const MainContext = createContext<MainContextType>(defaultContextValue);

export default function MainProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [genres, setGenres] = useState<any[]>([]); // Zustand für Genres
  const [trendingData, setTrendingData] = useState<any>({}); // Zustand für Trending-Daten
  const [allMovies, setAllMovies] = useState<any>({}); // Zustand für Trending-Daten
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedGenres, setSelectedGenres] = useState<any[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<any[]>([]);

  // Load all Genres
  useEffect(() => {
    const loadGenres = async () => {
      const data = await fetchGenres();
      setGenres(data);
    };
    loadGenres();
  }, []);

  // Load all Trending Movies
  useEffect(() => {
    const loadTrendingData = async () => {
      const data = await fetchTrendingData();
      setTrendingData(data);
    };
    loadTrendingData();
  }, []);

  // Load all Movies
  useEffect(() => {
    const loadAllMovies = async () => {
      const data = await fetchAllMovies();
      setAllMovies(data);
    };
    loadAllMovies();
  }, []);

  // Load filtered movies based on selected genres or search query
  useEffect(() => {
    const loadFilteredMovies = async () => {
      // use genre filtering (also for search) if genre(s) are selected
      if (selectedGenres.length > 0) {
        const data = await fetchGenreFilteredMovies({
          genreIds: selectedGenres,
          query: searchQuery,
        });
        setFilteredMovies(data);
        // if we have a search query but no genres selected, search entire db for movies
      } else if (searchQuery.trim() !== "") {
        const data = await searchMovies({ query: searchQuery });
        setFilteredMovies(data.results);
      } else {
        setFilteredMovies([]); // clear the list when no genres are selected
      }
    };
    loadFilteredMovies();
  }, [selectedGenres, searchQuery]);

  return (
    <MainContext.Provider
      value={{
        genres,
        setGenres,
        trendingData,
        setTrendingData,
        allMovies,
        setAllMovies,
        searchQuery,
        setSearchQuery,
        selectedGenres,
        setSelectedGenres,
        filteredMovies,
        setFilteredMovies,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
