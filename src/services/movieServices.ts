import { axios, baseOptions } from "./api";
import {
  MovieListResponse,
  Genre,
  MovieSearchParams,
  MovieDiscoverParams,
  VideoResponse,
  MovieDetails,
} from "../types/movie";

/**
 * Sucht nach Filmen basierend auf verschiedenen Parametern.
 *
 * @param params - Suchparameter
 * @param params.query - Der Suchbegriff
 * @param params.include_adult - Optional: Ob FSK18-Inhalte eingeschlossen werden sollen (Standard: false)
 * @param params.language - Optional: Sprache der Ergebnisse (Standard: de-DE)
 * @param params.primary_release_year - Optional: Hauptveröffentlichungsjahr
 * @param params.page - Optional: Seitennummer für Pagination (Standard: 1)
 * @param params.region - Optional: Region für die Suche
 * @param params.year - Optional: Veröffentlichungsjahr
 *
 * @returns Eine Promise mit der MovieListResponse
 * @throws Error wenn die API-Anfrage fehlschlägt
 */
export const searchMovies = async (
  params: MovieSearchParams,
): Promise<MovieListResponse> => {
  try {
    const queryParams = new URLSearchParams();

    // Konvertiere alle Parameter in Strings
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, String(value));
      }
    });

    // Füge Standardwerte hinzu
    queryParams.append("include_adult", String(params.include_adult ?? false));
    queryParams.append("language", params.language ?? "de-DE");
    queryParams.append("page", String(params.page ?? 1));

    const { data } = await axios.get(
      `/search/movie?${queryParams.toString()}`,
      baseOptions,
    );
    return data;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

/**
 * Entdeckt Filme basierend auf verschiedenen Filtern.
 * Ermöglicht komplexe Filterung nach Genres, Bewertungen, Veröffentlichungsdatum etc.
 *
 * @param params - Filter- und Sortierparameter
 * @param params.sort_by - Optional: Sortierung (z.B. "popularity.desc", "vote_average.desc")
 * @param params.with_genres - Optional: Komma-separierte Genre-IDs
 * @param params.vote_average_gte - Optional: Minimale Bewertung
 * @param params.primary_release_year - Optional: Veröffentlichungsjahr
 * @param params.with_original_language - Optional: Originalsprache
 *
 * @returns Eine Promise mit der MovieListResponse
 * @throws Error wenn die API-Anfrage fehlschlägt
 */
export const discoverMovies = async (
  params: MovieDiscoverParams,
): Promise<MovieListResponse> => {
  try {
    const queryParams = new URLSearchParams();

    // Konvertiere alle Parameter in Strings
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, String(value));
      }
    });

    // Füge Standardwerte hinzu
    queryParams.append("include_adult", String(params.include_adult ?? false));
    queryParams.append("include_video", String(params.include_video ?? false));
    queryParams.append("language", "de-DE");
    queryParams.append("page", String(params.page ?? 1));

    const { data } = await axios.get(
      `/discover/movie?${queryParams.toString()}`,
      baseOptions,
    );
    return data;
  } catch (error) {
    console.error("Error discovering movies:", error);
    throw error;
  }
};

/**
 * Holt alle verfügbaren Film-Genres in der angegebenen Sprache.
 *
 * @returns Eine Promise mit einem Array von Genre-Objekten
 * @throws Error wenn die API-Anfrage fehlschlägt
 */
export const getGenres = async (): Promise<{ genres: Genre[] }> => {
  try {
    console.log("Lade Genres...");
    const { data } = await axios.get("/genre/movie/list");
    console.log("Genres erfolgreich geladen:", data);
    return data;
  } catch (error) {
    console.error("Fehler beim Laden der Genres:", error);
    if (error instanceof Error) {
      console.error("Fehlermeldung:", error.message);
    }
    throw error;
  }
};

/**
 * Holt eine Liste der aktuell populärsten Filme.
 *
 * @param page - Optional: Seitennummer für Pagination (Standard: 1)
 * @returns Eine Promise mit der MovieListResponse
 * @throws Error wenn die API-Anfrage fehlschlägt
 */
export const getPopularMovies = async (
  page: number = 1,
): Promise<MovieListResponse> => {
  try {
    console.log("Lade beliebte Filme...");
    const { data } = await axios.get(`/movie/popular?page=${page}`);
    console.log("Beliebte Filme erfolgreich geladen:", data);
    return data;
  } catch (error) {
    console.error("Fehler beim Laden der beliebten Filme:", error);
    if (error instanceof Error) {
      console.error("Fehlermeldung:", error.message);
    }
    throw error;
  }
};

/**
 * Holt detaillierte Informationen zu einem spezifischen Film.
 *
 * @param movieId - Die ID des Films
 * @returns Eine Promise mit den vollständigen Film-Details
 * @throws Error wenn die API-Anfrage fehlschlägt
 */
export const getMovieDetails = async (
  movieId: number,
): Promise<MovieDetails> => {
  try {
    const { data } = await axios.get(`/movie/${movieId}`);
    return data;
  } catch (error) {
    console.error("Fehler beim Laden der Film-Details:", error);
    throw error;
  }
};

/**
 * Holt alle verfügbaren Videos (Trailer, Teaser, etc.) zu einem Film.
 *
 * @param movieId - Die ID des Films
 * @returns Eine Promise mit allen verfügbaren Videos
 * @throws Error wenn die API-Anfrage fehlschlägt
 *
 * @example
 * // Trailer finden
 * const videos = await getMovieVideos(movieId);
 * const trailer = videos.results.find(v => v.type === "Trailer");
 */
export const getMovieVideos = async (
  movieId: number,
): Promise<VideoResponse> => {
  try {
    const { data } = await axios.get(`/movie/${movieId}/videos`);
    return data;
  } catch (error) {
    console.error("Fehler beim Laden der Film-Videos:", error);
    throw error;
  }
};

/**
 * Holt eine Liste von Filmen, die dem angegebenen Film ähnlich sind.
 * Basiert auf Genres, Keywords und anderen Metadaten.
 *
 * @param movieId - Die ID des Referenzfilms
 * @returns Eine Promise mit ähnlichen Filmen
 * @throws Error wenn die API-Anfrage fehlschlägt
 */
export const getSimilarMovies = async (
  movieId: number,
  page: number = 1,
): Promise<MovieListResponse> => {
  try {
    const { data } = await axios.get(`/movie/${movieId}/similar?page=${page}`);
    return data;
  } catch (error) {
    console.error("Fehler beim Laden der ähnlichen Filme:", error);
    throw error;
  }
};

/**
 * Holt die aktuell trendenden Filme des Tages.
 *
 * @param page - Optional: Seitennummer für Pagination (Standard: 1)
 * @returns Eine Promise mit den Trending-Filmen
 * @throws Error wenn die API-Anfrage fehlschlägt
 */
export const getTrendingMovies = async (
  timeWindow: "day" | "week" = "week",
  page: number = 1,
): Promise<MovieListResponse> => {
  try {
    const { data } = await axios.get(
      `/trending/movie/${timeWindow}?page=${page}`,
    );
    return data;
  } catch (error) {
    console.error("Fehler beim Laden der Trending Filme:", error);
    throw error;
  }
};
