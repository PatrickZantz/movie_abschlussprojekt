import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const TrendingMovies = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const images = [
    {
      index: 1,
      img: "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
    },
    {
      index: 2,
      img: "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp",
    },
    {
      index: 3,
      img: "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
    },
    {
      index: 4,
      img: "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp",
    },
  ];

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

  return (
    <div className="trending-movies mx-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Trending Movies</h2>
        <Link to="/trendingMovies" className="text-primary font-semibold">
          See all
        </Link>
      </div>
      <div
        ref={carouselRef}
        className="carousel flex w-full snap-x snap-mandatory overflow-x-scroll scroll-smooth rounded-md"
      >
        {images.map((src) => (
          <div
            key={src.index}
            className="carousel-item w-full flex-shrink-0 snap-center"
          >
            <img src={src.img} className="w-full object-cover" />
          </div>
        ))}
      </div>

      <div className="flex w-full justify-center gap-2 py-2">
        {images.map((src) => (
          <button
            onClick={() => scrollToImage(src.index)}
            key={src.index}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              src.index - 1 === activeIndex
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
