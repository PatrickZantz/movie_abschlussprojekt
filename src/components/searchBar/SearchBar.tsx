import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  return (
    <form className="relative w-full mb-6">
      <input
        type="text"
        placeholder="Search Movie ..."
        className="bg-secondary focus:ring-primary w-full rounded-md py-3 pr-12 pl-4 text-gray-950 placeholder-gray-400 focus:ring-2 focus:outline-none"
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
