import React from 'react';
import VectorImage from '../../assets/Vector.png';
import Polygon from '../../assets/Polygon 3.png';

const MovieCard: React.FC<{
  title: string;
  image: string;
  rating: number;
  date: string;
  genre: string;
  duration: string;
}> = ({ title, image, rating, date, genre, duration }) => {
  const year = date.slice(0, 4);

  return (
    <div className="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg w-full max-w-md">
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
          <img src={Polygon} alt="Polygon Icon" className="w-5 h-5 cursor-pointer" />
          <span>{rating}</span>
          <span>• {year} </span>
          <span>• {genre} 
            {/* @TODO Das sind genre IDs. Hier in der Genre Liste einfach den ersten anzeigen */}
          </span>
          <span>• {duration} 
            {/* @TODO Dauer des Films ist sprachen abhängig und wird über die Dateils geladen */}
          </span>
        </div>
      </div>

      {/* Bookmark Icon */}
      <div className="flex-shrink-0">
        <img src={VectorImage} alt="Bookmark Icon" className="w-5 h-5 cursor-pointer" />
      </div>
    </div>
  );
};

export default MovieCard;
