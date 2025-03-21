import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  isActive?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  onClick,
  isActive = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex min-w-fit items-center justify-center rounded-md py-3 text-gray-950 ${isActive ? "bg-primary text-white" : "bg-gray-100"} ${className || ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
