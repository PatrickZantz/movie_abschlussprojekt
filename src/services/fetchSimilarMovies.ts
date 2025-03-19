import { axios, baseOptions } from "./api";

/**
 * Holt ähnliche Filme oder TV-Shows für ein Medium anhand seiner ID.
 * @param {string} media_id - Die ID des Mediums.
 * @param {string} mediaType - Der Typ des Mediums ('movie' oder 'tv').
 * @returns {Promise<Object>} Ein Promise, das ein Objekt mit ähnlichen Filmen oder TV-Shows zurückgibt.
 */
const fetchSimilarMovies = async (media_id: string, mediaType: string): Promise<any> => {
  const { data } = await axios.get(
    `/${mediaType}/${media_id}/similar`,
    baseOptions
  );

  return data;
};


export { fetchSimilarMovies };
