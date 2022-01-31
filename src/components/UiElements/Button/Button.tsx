import React from "react";
import "./Button.style.scss";

const Button: React.FC<{
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "solid" | "link" | "text" | "outlined";
  size?: "large" | "medium" | "small";
  color?: "primary" | "success" | "danger";
}> = ({
  disabled = false,
  type = "button",
  onClick,
  variant = "button",
  size = "medium",
  color = "primary",
  children,
}) => {
  return (
    <button
      className={`button ${variant && variant} ${size && size} ${
        color && color
      }`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
