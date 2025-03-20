import React, { useState } from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void; // onClick wird hier definiert
  className?: string; // className wird hier hinzugefügt
};

const Button: React.FC<ButtonProps> = ({ children, className }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    isActive ? setIsActive(false) : setIsActive(true);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex min-w-fit items-center justify-center rounded-md py-3 text-gray-950 ${isActive ? "bg-primary text-white" : "bg-secondary"} ${className || ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
