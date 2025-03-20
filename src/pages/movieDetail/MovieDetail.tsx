import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import backButton from '../../assets/back.png';
import { MovieDetails } from '../../types/movie';
import { getMovieDetails, getMovieVideos } from '../../services/movieServices';
import { useMain } from '../../context/MainProvider';
import Button from '../../components/button/Button';

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setError } = useMain();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [movieTrailer, setMovieTrailer] = useState<string | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovieData = async () => {
      if (!id) {
        setLocalError('Keine Film-ID gefunden');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setLocalError(null);
        
        // Lade Details und Videos parallel
        const [details, videos] = await Promise.all([
          getMovieDetails(Number(id)),
          getMovieVideos(Number(id))
        ]);

        if (!details) {
          throw new Error('Film nicht gefunden');
        }

        setMovieDetails(details);
        
        // Finde den ersten Trailer
        const trailer = videos.results.find(
          video => video.type === "Trailer" && video.site === "YouTube"
        );
        setMovieTrailer(trailer ? trailer.key : null);
      } catch (err) {
        console.error('Fehler beim Laden der Film-Details:', err);
        setLocalError(err instanceof Error ? err.message : 'Ein unbekannter Fehler ist aufgetreten');
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovieData();
  }, [id, setError]);

  // Schließen des Trailers mit der Escape-Taste
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowTrailer(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error || !movieDetails) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold mb-4">Fehler</h2>
        <p className="text-gray-300 text-center mb-6">
          {error || 'Film nicht gefunden'}
        </p>
        <Button onClick={() => navigate(-1)}>
          Zurück
        </Button>
      </div>
    );
  }

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section with Backdrop */}
      <div className="relative h-[400px] w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/60 to-black z-10" />
        <img 
          src={movieDetails.backdrop_path 
            ? `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`
            : '/placeholder-backdrop.jpg'
          }
          alt={movieDetails.title}
          className="w-full h-full object-cover opacity-90"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-backdrop.jpg';
          }}
        />
        
        {/* Back Button */}
        <Button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-all"
        >
          <img src={backButton} alt="Zurück" className="w-6 h-6" />
        </Button>
      </div>

      {/* Content Section */}
      <div className="relative z-20 px-6 -mt-20">
        <div className="flex flex-col gap-4">
          {/* Movie Title and Rating */}
          <div className="flex items-start justify-between">
            <h1 className="text-3xl font-bold max-w-[70%]">{movieDetails.title}</h1>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">★</span>
              <span className="text-2xl font-bold">{movieDetails.vote_average.toFixed(1)}</span>
            </div>
          </div>

          {/* Movie Meta Info */}
          <div className="flex items-center gap-4 text-gray-300 text-sm">
            <span>{formatDate(movieDetails.release_date)}</span>
            <span>•</span>
            <span>{formatRuntime(movieDetails.runtime)}</span>
            <span>•</span>
            <span className="truncate">{movieDetails.genres.map(g => g.name).join(', ')}</span>
          </div>

          {/* Overview */}
          <p className="text-gray-300 leading-relaxed max-w-3xl text-sm line-clamp-3">
            {movieDetails.overview || 'Keine Beschreibung verfügbar'}
          </p>

          {/* Languages */}
          <div className="mt-2">
            <h3 className="text-sm font-semibold mb-2">Sprachen</h3>
            <div className="flex gap-2 flex-wrap">
              {movieDetails.spoken_languages.length > 0 ? (
                movieDetails.spoken_languages.map(lang => (
                  <span key={lang.english_name} className="px-3 py-1 bg-gray-800 rounded-full text-xs">
                    {lang.english_name}
                  </span>
                ))
              ) : (
                <span className="text-gray-400">Keine Sprachen verfügbar</span>
              )}
            </div>
          </div>

          {/* Watch Trailer Button */}
          {movieTrailer ? (
            <Button 
              onClick={() => setShowTrailer(true)}
              className="mt-4 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Trailer ansehen
            </Button>
          ) : (
            <p className="mt-4 text-gray-400">Kein Trailer verfügbar</p>
          )}
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && movieTrailer && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setShowTrailer(false)}
        >
          <div 
            className="relative w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="absolute top-4 right-4 z-50 cursor-pointer"
              onClick={() => setShowTrailer(false)}
            >
              <svg 
                className="w-8 h-8 text-white hover:text-gray-300 transition-colors"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </div>
            <iframe
              src={`https://www.youtube.com/embed/${movieTrailer}?autoplay=1&controls=1`}
              title="Movie Trailer"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
