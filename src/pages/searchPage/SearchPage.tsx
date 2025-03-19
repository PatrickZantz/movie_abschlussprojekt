import MovieList from '../../components/movieList/MovieList';
import SearchBar from '../../components/searchBar/SearchBar';
import GenreFilter from '../../components/genreFilter/GenreFilter';
import Footer from '../../components/footer/Footer';

const SearchPage = () => {
  return (
    <section className="searchHome">
      <SearchBar />
      <div className="w-full">
        <GenreFilter onGenreSelect={(genre) => console.log(genre.name)} />
      </div>
      <MovieList />
      <Footer />
    </section>
  );
};

export default SearchPage;
