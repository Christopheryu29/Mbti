// Centralized error handling utility
export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = "AppError";
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class NetworkError extends AppError {
  constructor(message: string = "Network error occurred") {
    super(message, "NETWORK_ERROR", 0);
    this.name = "NetworkError";
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, "VALIDATION_ERROR", 400);
    this.name = "ValidationError";
  }
}

export class ApiError extends AppError {
  constructor(message: string, statusCode: number = 500) {
    super(message, "API_ERROR", statusCode);
    this.name = "ApiError";
  }
}

/**
 * Handle and normalize errors
 */
export const handleError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(error.message);
  }

  if (typeof error === "string") {
    return new AppError(error);
  }

  return new AppError("An unknown error occurred");
};

/**
 * Log errors in development
 */
export const logError = (error: unknown, context?: string): void => {
  if (import.meta.env.DEV) {
    console.error(`[Error ${context ? `in ${context}` : ""}]:`, error);
  }
};
