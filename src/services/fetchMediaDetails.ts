import { axios, baseOptions } from "./api";

/**
 * Holt die Details eines Mediums (Film oder TV-Show) anhand seiner ID.
 * @param {string} media_id - Die ID des Mediums.
 * @param {string} media_type - Der Typ des Mediums ('movie' oder 'tv').
 * @returns {Promise<Object>} Ein Promise, das ein Objekt mit den Mediendetails zurückgibt.
 */
const fetchMediaDetails = async (media_id: string, media_type: string): Promise<any> => {
  const { data } = await axios.get(
    `/${media_type}/${media_id}?language=de-DE`,
    baseOptions
  );

  return data;
};


export { fetchMediaDetails };
