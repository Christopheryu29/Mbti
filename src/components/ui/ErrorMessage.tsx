import React from "react";

export interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  className = "",
}) => {
  return (
    <div className={`error-message-container ${className}`}>
      <div className="error-icon">⚠️</div>
      <div className="error-text">{message}</div>
      {onRetry && (
        <button className="error-retry-button" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};
