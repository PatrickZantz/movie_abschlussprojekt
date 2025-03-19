import React, { createContext, useEffect, useState } from 'react';
import { fetchAllMovies } from '../services/fetchAllMovies'; // Erstellen Sie diese Funktion
import { fetchTrendingData } from '../services/fetchTrendingData';
import { fetchGenres } from '../services/fetchGenres';

type MainContextType = {
  genres: any[]; // Zustand für Genres
  setGenres: React.Dispatch<React.SetStateAction<any[]>>; // Setter für Genres
  trendingData: any; // Zustand für Trending-Daten
  setTrendingData: React.Dispatch<React.SetStateAction<any>>; // Setter für Trending-Daten
  allMovies: any;
  setAllMovies: React.Dispatch<React.SetStateAction<any>>;
};

const defaultContextValue: MainContextType = {
  genres: [],
  setGenres: () => {},
  trendingData: {},
  setTrendingData: () => {},
  allMovies: {},
  setAllMovies: () => {},
};

export const MainContext = createContext<MainContextType>(defaultContextValue);

export default function MainProvider({ children }: { children: React.ReactNode }) {
  const [genres, setGenres] = useState<any[]>([]); // Zustand für Genres
  const [trendingData, setTrendingData] = useState<any>({}); // Zustand für Trending-Daten
  const [allMovies, setAllMovies] = useState<any>({}); // Zustand für Trending-Daten

  useEffect(() => {
    const loadGenres = async () => {
      const data = await fetchGenres();
      setGenres(data);
    };
    loadGenres();
  }, []);

  useEffect(() => {
    const loadTrendingData = async () => {
      const data = await fetchTrendingData();
      setTrendingData(data);
    };
    loadTrendingData();
  }, []);

  useEffect(() => {
    const loadAllMovies = async () => {
      const data = await fetchAllMovies();
      setAllMovies(data);
    };
    loadAllMovies();
  }, []);

  return (
    <MainContext.Provider value={{ genres, setGenres, trendingData, setTrendingData, allMovies, setAllMovies }}>
      {children}
    </MainContext.Provider>
  );
}
