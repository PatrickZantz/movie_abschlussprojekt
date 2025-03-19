import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBookmark, faUser, faDownload} from '@fortawesome/free-solid-svg-icons';




const Footer: React.FC = () => {
  return (
      <footer className="flex justify-center gap-56 items-center p-5">
          <Link to="/" className="flex items-center">
          <FontAwesomeIcon icon={faHome} className="text-gray-300 mr-2.5 text-2xl" />
              <span className="-ml-2 text-xl text-gray-400 font-bold">Home</span>
          </Link>

          <Link to="/bookmarks">
              <FontAwesomeIcon icon={faBookmark} size="2x" className="text-gray-300" />
          </Link>

          <Link to="/downloads">
              <FontAwesomeIcon icon={faDownload} size="2x" className="text-gray-300" />
          </Link>

          <Link to="/profile">
              <FontAwesomeIcon icon={faUser} size="2x" className="text-gray-300" />
          </Link>
      </footer>
);
};

export default Footer;
