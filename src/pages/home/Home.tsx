import Header from "../../components/header/Header";
import TrendingMovies from "../../components/trendingMovies/TrendingMovies";
import SearchBar from "../../components/searchBar/SearchBar"; // Importiere die SearchBar-Komponente
import GenreFilter from "../../components/genreFilter/GenreFilter"; // Importiere die GenreFilter-Komponente
import Footer from "../../components/footer/Footer";

const Home = () => {
  return (
    <section className="searchHome">
      <Header />
      <SearchBar />
      <GenreFilter onGenreSelect={(genre) => console.log(genre.name)} />
      <div className="mt-30">
        <TrendingMovies />
      </div>
      <Footer />
    </section>
  );
};

export default Home;
