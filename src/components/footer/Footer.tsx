import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBookmark,
  faUser,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import EllipseImage from "../../assets/Ellipse 7.png";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  // const [showFavorites, setShowFavorites] = useState(false);

  const handleIconClick = (icon: string) => {
    setActiveIcon(icon);
    if (icon === "home") {
      navigate("/home");
    }
  };

  const isIconActive = (icon: string) => {
    return activeIcon === icon;
  };

  // const handleBookmarkClick = () => {
  //   setShowFavorites(!showFavorites);
  //   setActiveIcon('bookmark');
  // };

  // const getIconClass = (icon: string) => {
  //   return activeIcon === icon ? "active-icon" : "";
  // };

  const isHomePage = location.pathname === "/home";

  return (
    <div className="sticky right-0 bottom-0 left-0 w-full bg-white py-4">
      <footer className="flex items-center justify-between px-10 text-[#97aabd]">
        <div
          onClick={() => handleIconClick("home")}
          className={`relativ} relative flex cursor-pointer items-center`}
        >
          <img
            src={EllipseImage}
            alt="Ellipse"
            className={`absolute top-1/2 left-[-10px] z-0 h-4 w-4 -translate-y-1/2 transform text-[#97aabd] ${isHomePage ? "text-red-400" : ""}`}
          />

          <FontAwesomeIcon
            icon={faHome}
            className={`relative z-10 text-xl ${isHomePage ? "text-red-400" : "text-[#97aabd]"}`}
          />
          <p
            className={`text-l ml-4 font-bold ${isHomePage ? "text-red-500" : ""}`}
          >
            Home
          </p>
        </div>

        <div
          onClick={() => handleIconClick("download")}
          className={`cursor-pointer`}
        >
          <FontAwesomeIcon
            icon={faDownload}
            className={`text-xl ${isIconActive("download") ? "text-red-400" : "text-[#97aabd]"}`}
          />
        </div>

        <div
          onClick={() => handleIconClick("bookmark")}
          className={`cursor-pointer`}
        >
          <FontAwesomeIcon
            icon={faBookmark}
            className={`text-xl ${isIconActive("bookmark") ? "text-red-400" : "text-[#97aabd]"}`}
          />
        </div>

        <div
          onClick={() => handleIconClick("profile")}
          className={`cursor-pointer`}
        >
          <FontAwesomeIcon
            icon={faUser}
            className={`text-xl ${isIconActive("profile") ? "text-red-400" : "text-[#97aabd]"}`}
          />
        </div>
      </footer>
    </div>
  );
};

export default Footer;
