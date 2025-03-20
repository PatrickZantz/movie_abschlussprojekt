import React, { useEffect, useState } from "react";
import { fetchGenres } from "../../services/fetchGenres";
import Button from "../button/Button"; // Importiere die Button-Komponente

interface Genre {
  id: number;
  name: string;
}

interface GenreFilterProps {
  onGenreSelect: (genre: Genre) => void; // Typ für onGenreSelect definieren
}

const GenreFilter: React.FC<GenreFilterProps> = ({ onGenreSelect }) => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const getGenres = async () => {
      const fetchedGenres = await fetchGenres();
      setGenres(fetchedGenres);
    };
    getGenres();
  }, []);

  const handleGenreSelect = (genre: Genre) => {
    onGenreSelect(genre); // Genre an die übergeordnete Komponente weitergeben
  };

  return (
    <section className="mb-4 flex w-full gap-2">
      {genres.slice(0, 3).map((genre) => (
        <Button
          key={genre.id}
          onClick={() => handleGenreSelect(genre)}
          className="flex-grow"
        >
          {genre.name}
        </Button>
      ))}
    </section>
  );
};

export default GenreFilter;
