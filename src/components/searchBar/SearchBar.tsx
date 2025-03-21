import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { MainContext } from "../../context/MainProvider";

const SearchBar = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, selectedGenres, setSelectedGenres } =
    useContext(MainContext);
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleSubmit = () => (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchQuery(inputValue);
    console.log("Search", inputValue, selectedGenres);
    navigate("/search");
  };

  return (
    <form className="relative mb-3 w-full" onSubmit={handleSubmit()}>
      <input
        type="text"
        placeholder="Search Movie ..."
        className="bg-secondary focus:ring-primary w-full rounded-md py-3 pr-12 pl-4 text-gray-950 placeholder-gray-400 focus:ring-2 focus:outline-none"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        type="submit"
        className="absolute inset-y-0 right-4 flex cursor-pointer items-center text-gray-400 hover:text-gray-950"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
};

export default SearchBar;
