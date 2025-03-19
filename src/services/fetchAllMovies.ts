import { axios, baseOptions } from "./api";

/**
 * Holt alle Filme.
 * @returns {Promise<Object>} Ein Promise, das ein Objekt mit den Film-Daten zurückgibt.
 */
const fetchAllMovies = async (): Promise<any> => {
  const { data } = await axios.get(
    `/movie/popular?language=de-DE`,
    baseOptions
  );

  return data;
};

export { fetchAllMovies };
