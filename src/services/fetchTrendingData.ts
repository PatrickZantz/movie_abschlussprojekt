import { axios, baseOptions } from "./api";

/**
 * Holt die Trending-Daten für Filme und TV-Shows.
 * @param {number} [page=1] - Die Seitenzahl der Trending-Daten (Standard ist 1).
 * @returns {Promise<Object>} Ein Promise, das ein Objekt mit den Trending-Daten zurückgibt.
 */
const fetchTrendingData = async (page: number = 1): Promise<any> => {
  const { data } = await axios.get(
    `/trending/all/day?language=de-DE&page=${page}`,
    baseOptions
  );

  return data;
};


export { fetchTrendingData };
