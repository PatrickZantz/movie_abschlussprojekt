import { useLocation } from "react-router-dom";
import GenreFilter from "../genreFilter/GenreFilter";
import SearchBar from "../searchBar/SearchBar";

export default function Header() {
  const location = useLocation();
  return (
    <header className="mx-6 my-10 flex flex-col gap-4">
      {location.pathname === "/home" && (
        <h1 className="mt-5 mb-10 text-center text-4xl font-bold text-gray-950">
          Welcome!
        </h1>
      )}
      <SearchBar />
      <GenreFilter />
    </header>
  );
}
