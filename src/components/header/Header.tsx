import GenreFilter from "../genreFilter/GenreFilter";
import SearchBar from "../searchBar/SearchBar";

export default function Header() {
  return (
    <header className="mx-6 my-10 flex flex-col gap-4">
      <SearchBar />
      <GenreFilter />
    </header>
  );
}
