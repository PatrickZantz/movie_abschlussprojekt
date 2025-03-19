import React, { useEffect, useState } from 'react';
import { fetchGenres } from '../../services/fetchGenres';

interface Genre {
  id: number;
  name: string;
}

const GenreFilter = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const buttonDesign =
    "bg-secondary flex flex-1 items-center justify-center rounded-md min-w-fit py-3 text-gray-950";

  useEffect(() => {
    const getGenres = async () => {
      const fetchedGenres = await fetchGenres();
      setGenres(fetchedGenres);
    };
    getGenres();
  }, []);

  return (
    <section className="genre-filter flex w-full gap-2">
      {genres.slice(0, 3).map((genre) => (
        <button key={genre.id} onClick={() => console.log(genre.name)} className={buttonDesign}>
          {genre.name}
        </button>
      ))}
    </section>
  );
};



export default GenreFilter;
