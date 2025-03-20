import axios from "axios";
import { APIError, TMDBError } from "../types/api";

// API-Konfiguration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = "126d226be255b1f97281d0cfd405e5a3";

if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL muss in der .env Datei definiert sein");
}

// Erstelle eine Axios-Instanz mit Standardkonfiguration
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  params: {
    api_key: API_KEY,
  },
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Erstellt einen standardisierten API-Fehler
 */
const createAPIError = (error: any): APIError => {
  if (error.response) {
    const tmdbError = error.response.data as TMDBError;
    return {
      type: "api",
      status: error.response.status,
      message: tmdbError.status_message || "Ein API-Fehler ist aufgetreten",
      endpoint: error.config.url,
      data: tmdbError,
    };
  } else if (error.request) {
    return {
      type: "network",
      message: "Netzwerkfehler: Keine Antwort vom Server erhalten",
    };
  }
  return {
    type: "unknown",
    message: error.message || "Ein unbekannter Fehler ist aufgetreten",
  };
};

// Interceptor für Fehlerbehandlung
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError = createAPIError(error);

    // Logge den Fehler mit zusätzlichen Details
    console.error("API Error:", {
      ...apiError,
      stack: error.stack,
    });

    return Promise.reject(apiError);
  },
);

// Standardoptionen für API-Anfragen
const baseOptions = {
  headers: {
    accept: "application/json",
  },
};

export const BASE_URL = API_BASE_URL;
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const API_ENDPOINTS = {
  // ... existing code ...
};

export { axiosInstance as axios, baseOptions };
