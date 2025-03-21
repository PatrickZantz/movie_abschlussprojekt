import React from 'react';
import { useMain } from '../../context/MainProvider';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';

const GenreFilter: React.FC = () => {
  const { genres, selectedGenres, setSelectedGenres } = useMain();
  const navigate = useNavigate();

  const allowedGenres = ["Action", "Comedy", "Horror"];
  const filteredGenres = genres.filter((genre) => allowedGenres.includes(genre.name));

  const handleGenreClick = (genreId: number) => {
    setSelectedGenres(prev => 
      prev.includes(genreId)
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    );
    navigate('/search');
  };

  return (
    <section className="mb-4 flex w-full gap-2">
      {filteredGenres.map(genre => (
        <Button
          key={genre.id}
          onClick={() => handleGenreClick(genre.id)}
          className={`flex-grow ${selectedGenres.includes(genre.id) ? 'bg-red-600 text-white' : ''}`}
        >
          {genre.name}
        </Button>
      ))}
    </section>
  );
};

export default GenreFilter;
