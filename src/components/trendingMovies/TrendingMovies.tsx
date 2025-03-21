import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMain } from "../../context/MainProvider";

const TrendingMovies = () => {
  const { trendingMovies, isLoading } = useMain();
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const handleMovieClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  // Detect active slide based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const scrollPosition = carouselRef.current.scrollLeft;
        const slideWidth = carouselRef.current.offsetWidth;
        const newIndex = Math.round(scrollPosition / slideWidth);
        setActiveIndex(newIndex);
      }
    };

    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollToImage = (index: number) => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: slideWidth * (index - 1),
        behavior: "smooth",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const movies = trendingMovies?.results.slice(0, 4) || [];

  return (
    <div className="trending-movies flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Trending Movies</h2>
        <Link to="/search" className="text-primary font-semibold">
          See all
        </Link>
      </div>
      <div
        ref={carouselRef}
        className="carousel flex w-full snap-x snap-mandatory overflow-x-scroll scroll-smooth rounded-md"
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="carousel-item flex-shrink-0 snap-center cursor-pointer relative"
            onClick={() => handleMovieClick(movie.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path || ''}`}
              alt={movie.title}
              className="object-cover h-[200px] w-[400px]"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
              <h3 className="text-white text-sm font-medium">{movie.title}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="flex w-full justify-center gap-2 py-2">
        {movies.map((movie, index) => (
          <button
            onClick={() => scrollToImage(index + 1)}
            key={movie.id}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "bg-primary scale-125"
                : "bg-tertiary"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default TrendingMovies;
