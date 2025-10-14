import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  isLoading = false,
  fullWidth = false,
  disabled,
  className = "",
  ...props
}) => {
  const baseClasses = "button";
  const variantClasses = `button-${variant}`;
  const sizeClasses = `button-${size}`;
  const fullWidthClass = fullWidth ? "button-full-width" : "";
  const loadingClass = isLoading ? "button-loading" : "";

  const combinedClassName = [
    baseClasses,
    variantClasses,
    sizeClasses,
    fullWidthClass,
    loadingClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={combinedClassName}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="button-spinner">Loading...</span>
      ) : (
        children
      )}
    </button>
  );
};
