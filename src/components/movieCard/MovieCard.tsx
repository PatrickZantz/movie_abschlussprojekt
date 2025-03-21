import React from 'react';
import { useNavigate } from 'react-router-dom';
import Polygon from '../../assets/Polygon 3.png';
import { useMain } from '../../context/MainProvider';

const MovieCard: React.FC<{
  movieId: number;
  title: string;
  image: string;
  rating: number;
  date: string;
  genre: number[];
  duration?: string; // Optional, da nicht alle API-Aufrufe die Dauer enthalten
}> = ({ movieId, title, image, rating, date, duration }) => {
  const navigate = useNavigate();
  const { favoriteMovies, toggleFavorite } = useMain();
  const year = date.slice(0, 4);
  const isBookmarked = favoriteMovies.includes(movieId);

  const handleMovieClick = () => {
    navigate(`/movie/${movieId}`);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Verhindert, dass der Movie-Click ausgelöst wird
    toggleFavorite(movieId);
  };

  return (
    <div 
      className="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg w-full max-w-md cursor-pointer transform transition-transform hover:scale-105"
      onClick={handleMovieClick}
    >
      {/* Bild */}
      <figure className="w-20 h-28 flex-shrink-0">
        <img src={image} alt={title} className="w-full h-full object-cover rounded-md" />
      </figure>

      {/* Inhalt */}
      <div className="flex flex-col justify-between w-full">
        {/* Titel */}
        <h2 className="text-lg font-bold">{title}</h2>

        {/* Details */}
        <div className="flex items-center text-sm text-gray-500 gap-2 mt-1">
          <img src={Polygon} alt="Polygon Icon" className="w-5 h-5" />
          <span>{rating.toFixed(1)}</span>
          <span>•</span>
          <span>{year}</span>
          {duration && (
            <>
              <span>•</span>
              <span>{duration}</span>
            </>
          )}
        </div>
      </div>

      {/* Bookmark Icon */}
      <div 
        className="flex-shrink-0 cursor-pointer"
        onClick={handleBookmarkClick}
      >
        <svg 
          width="30" 
          height="30" 
          viewBox="0 0 24 24" 
          fill={isBookmarked ? "#DC2626" : "none"} 
          stroke="black" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
        </svg>
      </div>
    </div>
  );
};

export default MovieCard;
