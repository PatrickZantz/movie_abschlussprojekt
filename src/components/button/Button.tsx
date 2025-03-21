import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  isActive?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, className, onClick, disabled, isActive = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex min-w-fit items-center justify-center rounded-md py-3 text-gray-950 ${isActive ? "bg-primary text-white" : "bg-secondary"} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className || ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
