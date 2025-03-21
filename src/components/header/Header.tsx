import { useLocation, useNavigate } from "react-router-dom";
import GenreFilter from "../genreFilter/GenreFilter";
import SearchBar from "../searchBar/SearchBar";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <header
      className={`z-10 flex w-full flex-col gap-2 px-6 pt-5 ${location.pathname !== "/home" && "sticky top-0 bg-white shadow-lg"}`}
    >
      {location.pathname === "/home" && (
        <h1 className="mt-10 mb-10 text-center text-4xl font-bold text-gray-950">
          Welcome!
        </h1>
      )}
      {location.pathname !== "/home" && (
        <h1
          onClick={() => navigate("/home")}
          className="text-primary cursor-pointer text-center text-2xl font-bold"
        >
          .MOV
        </h1>
      )}
      <SearchBar />
      <GenreFilter />
    </header>
  );
}
