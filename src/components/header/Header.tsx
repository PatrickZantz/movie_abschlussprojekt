import GenreFilter from "../genreFilter/GenreFilter";
import SearchBar from "../searchBar/SearchBar";

export default function Header() {
  return (
    <header>
      <SearchBar />
      <GenreFilter />
    </header>
  );
}
