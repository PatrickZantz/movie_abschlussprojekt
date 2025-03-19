import React, { useState } from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void; // onClick wird hier definiert
  className?: string; // className wird hier hinzugefügt
};

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(true);
    onClick();
  };

  return (
    <button 
      onClick={handleClick} 
      className={`flex items-center justify-center rounded-md min-w-fit py-3 text-gray-950 ${isActive ? 'color-primary' : 'bg-secondary'} ${className || ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
