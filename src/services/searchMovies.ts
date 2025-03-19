import { axios, baseOptions } from "./api";

/**
 * Sucht nach Filmen basierend auf den bereitgestellten Abfrageparametern.
 * @param {Object} queryParams - Die Abfrageparameter für die Filmsuche.
 * @param {string} queryParams.query - Die Suchanfrage.
 * @param {boolean} [queryParams.include_adult=false] - Ob auch Inhalte für Erwachsene einbezogen werden sollen (Standard ist false).
 * @param {string} [queryParams.language="de-DE"] - Die Sprache der Suchergebnisse (Standard ist "de-DE").
 * @param {string} [queryParams.primary_release_year=""] - Das Hauptveröffentlichungsjahr der zu suchenden Filme.
 * @param {number} [queryParams.page=1] - Die Seitenzahl der Suchergebnisse (Standard ist 1).
 * @param {string} [queryParams.region=""] - Die Region, um die Suchergebnisse zu filtern.
 * @param {string} [queryParams.year=""] - Das Veröffentlichungsjahr der zu suchenden Filme.
 * @returns {Promise<Object>} Ein Promise, das ein Objekt mit den Suchergebnissen zurückgibt.
 */
const searchMovies = async (queryParams: {
  query: string;
  include_adult?: boolean;
  language?: string;
  primary_release_year?: string;
  page?: number;
  region?: string;
  year?: string;
}): Promise<any> => {
  const options = {
    ...baseOptions,
    params: {
      query: queryParams.query,
      include_adult: queryParams.include_adult || false,
      language: queryParams.language || "de-DE",
      primary_release_year: queryParams.primary_release_year || "",
      page: queryParams.page || 1,
      region: queryParams.region || "",
      year: queryParams.year || "",
    },
  };

  const { data } = await axios.get("/search/movie", options);

  return data;
};

export { searchMovies };
