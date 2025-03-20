// import VectorImage from '../../assets/Vector.png';
// import DownloadImage from '../../assets/Download.png';
// import ProfileImage from '../../assets/Profile.png';
// import { useNavigate } from 'react-router-dom';

// const Footer = () => {
//   const navigate = useNavigate();

//   const handleHomeClick = (icon: string) => {
//     navigate('/Home');
//     setActiveIcon(icon);
//   };
//   const [activeIcon, setActiveIcon] = useState<string | null>('home');

//   const handleClick = (icon: string) => {
//     setActiveIcon(icon);
//   };

//   const getIconClass = (icon: string) => {
//     return activeIcon === icon ? 'active-icon' : '';
//   };

//   return (
//     <footer className="flex gap-8 items-center justify-center fixed bottom-8 left-0 right-0 w-full text-[#97aabd]">
//       <div onClick={() => handleHomeClick('home')} className={`flex items-center cursor-pointer ${getIconClass('home')} relative`}>
//         <img src={EllipseImage} alt="Ellipse" className="w-4 h-4 absolute left-[-10px] top-1/2 transform -translate-y-1/2 z-0" />
//         <img src={HomeImage} alt="Home" className="w-6 h-6 z-10 relative" />
//         <p className="font-bold text-l ml-4">Home</p>
//       </div>
//       <div onClick={() => handleClick('vector')} className={`cursor-pointer ${getIconClass('vector')}`}>
//         <img src={VectorImage} alt="Vector" className="w-6 h-6" />
//       </div>
//       <div onClick={() => handleClick('download')} className={`cursor-pointer ${getIconClass('download')}`}>
//         <img src={DownloadImage} alt="Download" className="w-6 h-6" />
//       </div>
//       <div onClick={() => handleClick('profile')} className={`cursor-pointer ${getIconClass('profile')}`}>
//         <img src={ProfileImage} alt="Profile" className="w-6 h-6" />
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBookmark, faUser, faDownload, } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import EllipseImage from '../../assets/Ellipse 7.png';

const Footer = () => {
  const navigate = useNavigate();
  const [activeIcon, setActiveIcon] = useState<string | null>('home');
  const [showFavorites, setShowFavorites] = useState(false);

  const handleHomeClick = (icon: string) => {
    navigate('/home');
    setActiveIcon(icon);
  };

  const handleClick = (icon: string) => {
    setActiveIcon(icon);
  };

  const handleBookmarkClick = () => {
    setShowFavorites(!showFavorites);
    setActiveIcon('bookmark');
  };

  const getIconClass = (icon: string) => {
    return activeIcon === icon ? 'active-icon' : '';
  };

  const isHomePage = location.pathname === '/home';


  return (
    <footer className="flex gap-8 items-center justify-center fixed bottom-0 left-0 right-0 w-full text-[#97aabd]">

        <div onClick={() => handleHomeClick('home')} className={`flex items-center cursor-pointer ${getIconClass('home')} relative`}>
          
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

        <div onClick={() => handleClick('download')} 
          className={`cursor-pointer ${getIconClass('download')}`}>
          <FontAwesomeIcon icon={faBookmark} className="text-[#97aabd] text-xl" />
        </div>

        <div onClick={() => handleClick('download')} className={`cursor-pointer ${getIconClass('download')}`}>
          <FontAwesomeIcon icon={faDownload} className="text-[#97aabd] text-xl" />
        </div>

      <div onClick={() => handleClick('profile')} className={`cursor-pointer ${getIconClass('profile')}`}>
        <FontAwesomeIcon icon={faUser} className="text-[#97aabd] text-xl" />
      </div>

    </footer>
  );
};

export default Footer;
