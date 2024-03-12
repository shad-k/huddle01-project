import React from "react";
import clsx from "clsx";

interface ButtonProps {
  text: string;
  icon?: React.ReactElement;
  onClick: () => void;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  className?: string;
  disabled?: boolean;
}

const buttonClasses = {
  primary:
    "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded",
  secondary:
    "bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded",
};

const buttonSizes = {
  small: "text-xs",
  medium: "text-sm",
  large: "text-base",
};

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  onClick,
  variant = "primary",
  size = "medium",
  className,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-50",
        buttonClasses[variant],
        buttonSizes[size],
        className,
      )}
      disabled={disabled}
    >
      {text}
      {icon}
    </button>
  );
};

export default Button;
