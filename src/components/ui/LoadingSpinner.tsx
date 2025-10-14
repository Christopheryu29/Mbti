import React from "react";

export interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  message?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  message,
  className = "",
}) => {
  return (
    <div className={`loading-spinner-container ${className}`}>
      <div className={`loading-spinner loading-spinner-${size}`}>
        <div className="spinner"></div>
      </div>
      {message && <div className="loading-message">{message}</div>}
    </div>
  );
};
