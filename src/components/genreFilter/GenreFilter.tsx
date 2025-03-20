import { useContext } from "react";
import Button from "../button/Button"; // Importiere die Button-Komponente
import { MainContext } from "../../context/MainProvider";
import { useNavigate } from "react-router-dom";

interface Genre {
  id: number;
  name: string;
}

const GenreFilter = () => {
  const { genres, setSelectedGenres } = useContext(MainContext);

  const navigate = useNavigate();

  const handleGenreSelect = (genre: Genre) => {
    setSelectedGenres((prevSelected) => {
      const isAlreadySelected = prevSelected.includes(genre.id);
      const updatedGenres = isAlreadySelected
        ? prevSelected.filter((id) => id !== genre.id) // Remove genre
        : [...prevSelected, genre.id]; // Add genre

      return updatedGenres;
    });
    navigate("/search");
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
