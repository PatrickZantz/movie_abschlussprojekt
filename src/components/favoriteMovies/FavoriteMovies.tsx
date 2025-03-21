import React, { useState, useEffect } from 'react';
import { getPopularMovies } from '../../services/movieServices';

interface Movie {
  id: number;
  title: string;
  
}


interface FavoriteMoviesProps {
  favoriteMovieIds: number[];
}

const FavoriteMovies: React.FC<FavoriteMoviesProps> = ({
    favoriteMovieIds,
}) => {
    const [allMovies, setAllMovies] = useState<Movie[]>([]);
    const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);


    useEffect(() => {
        const getMovies = async () => {
          const data = await getPopularMovies();
          setAllMovies(data.results);
        };
    
        getMovies();
      }, []);
    
      useEffect(() => {
        const filteredMovies = allMovies.filter((movie) =>
          favoriteMovieIds.includes(movie.id)
        );
        setFavoriteMovies(filteredMovies);
        
      }, [allMovies, favoriteMovieIds]);
    
      return (
        <div>
          <h2>Lieblingsfilme</h2>
          <ul>
            {favoriteMovies.map((movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
        </div>
      );
    };
    
    export default FavoriteMovies;
    
