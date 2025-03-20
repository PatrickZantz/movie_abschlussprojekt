// Basis-Movie-Interface für die Listenansicht
export interface MovieListItem {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

// Erweitertes Movie-Interface für die Detailansicht
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  runtime: number;
  genres: Genre[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
  production_companies: {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
    parent_company: null | {
      id: number;
      name: string;
      logo_path: string | null;
    };
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieListResponse {
  page: number;
  results: MovieListItem[];
  total_pages: number;
  total_results: number;
}

// Video-Interface für Trailer
export interface VideoResponse {
  id: number;
  results: {
    key: string;
    site: string;
    type: string;
    name: string;
    size: number;
    official: boolean;
    published_at: string;
  }[];
}

// Parameter-Interfaces für API-Anfragen
export interface MovieSearchParams {
  query: string;
  include_adult?: boolean;
  language?: string;
  primary_release_year?: string;
  page?: number;
  region?: string;
  year?: string;
}

export interface MovieDiscoverParams {
  sort_by?: string;
  certification_country?: string;
  certification?: string;
  include_adult?: boolean;
  include_video?: boolean;
  page?: number;
  primary_release_year?: number;
  primary_release_date_gte?: string;
  primary_release_date_lte?: string;
  release_date_gte?: string;
  release_date_lte?: string;
  with_genres?: string;
  with_original_language?: string;
  vote_average_gte?: number;
  vote_average_lte?: number;
  vote_count_gte?: number;
  with_runtime_gte?: number;
  with_runtime_lte?: number;
  with_watch_providers?: string;
  watch_region?: string;
}

export type MovieDetails = Movie;
