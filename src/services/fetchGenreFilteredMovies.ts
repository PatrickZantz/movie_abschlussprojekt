import { axios, baseOptions } from "./api";

const fetchGenreFilteredMovies = async (queryParams: {
  genreIds: number[];
  query?: string;
  include_adult?: boolean;
  language?: string;
  page?: number;
}): Promise<any[]> => {
  const options = {
    ...baseOptions,
    params: {
      with_genres: queryParams.genreIds.join(","),
      language: queryParams.language || "de-DE",
      include_adult: queryParams.include_adult || false,
      page: queryParams.page || 1,
    },
  };
  const { data } = await axios.get("/discover/movie", options);

  if (queryParams.query) {
    return data.results.filter((movie: any) =>
      movie.title
        .toLowerCase()
        .includes(
          queryParams.query?.toLowerCase() ||
            movie.original_title
              .toLowerCase()
              .includes(queryParams.query?.toLowerCase()) ||
            movie.primary_release_year.includes(
              queryParams.query?.toLowerCase(),
            ) ||
            movie.overview
              .toLowerCase()
              .includes(queryParams.query?.toLowerCase()),
        ),
    );
  }

  return data.results;
};

export { fetchGenreFilteredMovies };
