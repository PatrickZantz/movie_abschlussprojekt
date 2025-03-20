
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBookmark, faUser, faDownload, } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import EllipseImage from '../../assets/Ellipse 7.png';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  // const [showFavorites, setShowFavorites] = useState(false);

  const handleIconClick = (icon: string) => {
    
    setActiveIcon(icon);
    if (icon === 'home') {
      navigate('/home');

    }
  };

  const isIconActive = (icon: string) => {
    return activeIcon === icon;
  };

  // const handleBookmarkClick = () => {
  //   setShowFavorites(!showFavorites);
  //   setActiveIcon('bookmark');
  // };



  const getIconClass = (icon: string) => {
    return activeIcon === icon ? 'active-icon' : '';
  };

  const isHomePage = location.pathname === '/home';



  return (
    <div className='bg-gray-50 py-2 sticky bottom-0 left-0 right-0 w-full'>

    <footer className="flex gap-22 items-center justify-center s text-[#97aabd]">

        <div onClick={() => handleIconClick('home')} className={`flex items-center cursor-pointer relativ} relative`}>
          
          <img 
            src={EllipseImage} 
            alt="Ellipse" 
            className={`w-4 h-4 absolute left-[-10px] top-1/2 transform -translate-y-1/2 z-0 text-[#97aabd] ${isHomePage ? 'text-red-400' : ''}`}
/>
          
            <FontAwesomeIcon 
            icon={faHome} 
            className={`text-xl z-10 relative ${isHomePage ? 'text-red-400' : 'text-[#97aabd]'}`}/>
          <p className={`font-bold text-l ml-4 ${isHomePage ? 'text-red-500' : ''}`}>Home</p>
        </div>

        <div onClick={() => handleIconClick('download')} 
          className={`cursor-pointer`}>
          <FontAwesomeIcon icon={faDownload} className={`text-xl ${isIconActive('download') ? 'text-red-400' : 'text-[#97aabd]'}`} />
        </div>

        <div onClick={() => handleIconClick('bookmark')} className={`cursor-pointer`}>
          <FontAwesomeIcon icon={faBookmark} className={`text-xl ${isIconActive('bookmark') ? 'text-red-400' : 'text-[#97aabd]'}`} />
        </div>
        
        <div onClick={() => handleIconClick('profile')} className={`cursor-pointer`}>
          <FontAwesomeIcon icon={faUser} className={`text-xl ${isIconActive('profile') ? 'text-red-400' : 'text-[#97aabd]'}`} />
        </div>

    </footer>
            </div>
  );
};

export default Footer;
