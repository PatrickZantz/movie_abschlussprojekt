import { useLocation } from "react-router-dom";
import GenreFilter from "../genreFilter/GenreFilter";
import SearchBar from "../searchBar/SearchBar";

export default function Header() {
  const location = useLocation();
  return (
    <header
      className={`flex w-full flex-col gap-2 px-6 pt-5 ${location.pathname !== "/home" && "sticky bg-white shadow-lg"}`}
    >
      {location.pathname === "/home" && (
        <h1 className="mt-10 mb-10 text-center text-4xl font-bold text-gray-950">
          Welcome!
        </h1>
      )}
      {location.pathname === "/search" && (
        <h1 className="text-primary text-center text-2xl font-bold">.MOV</h1>
      )}
      <SearchBar />
      <GenreFilter />
    </header>
  );
}
