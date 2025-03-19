import { axios, baseOptions } from "./api";

/**
 * Holt die verfügbaren Genres von der API.
 * @returns {Promise<Array>} Ein Promise, das ein Array mit den verfügbaren Genres zurückgibt.
 */
const fetchGenres = async (): Promise<any[]> => {
  const { data } = await axios.get(
    "/genre/movie/list?language=de-DE",
    baseOptions,
  );
  return data.genres;
};

export { fetchGenres };
