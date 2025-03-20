/**
 * TMDB API Fehlerantwort
 */
export interface TMDBError {
  status_message: string;
  status_code: number;
}

/**
 * Allgemeine API Fehlertypen
 */
export type APIError =
  | {
      type: "api";
      status: number;
      message: string;
      endpoint: string;
      data?: TMDBError;
    }
  | {
      type: "network";
      message: string;
    }
  | {
      type: "unknown";
      message: string;
    };

/**
 * API Response Status
 */
export interface APIStatus {
  success: boolean;
  status_code?: number;
  status_message?: string;
}
