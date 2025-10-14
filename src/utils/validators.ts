// Validation utilities
import { ValidationError } from "./errorHandler";

export const validators = {
  required: (value: string, fieldName: string): void => {
    if (!value || value.trim() === "") {
      throw new ValidationError(`${fieldName} is required`);
    }
  },

  phone: (value: string): void => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(value)) {
      throw new ValidationError("Invalid phone number format");
    }
  },

  email: (value: string): void => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new ValidationError("Invalid email format");
    }
  },

  fileSize: (file: File, maxSizeMB: number = 10): void => {
    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      throw new ValidationError(`File size must be less than ${maxSizeMB}MB`);
    }
  },

  fileType: (file: File, allowedTypes: string[]): void => {
    if (!allowedTypes.some((type) => file.type.startsWith(type))) {
      throw new ValidationError(
        `Invalid file type. Allowed types: ${allowedTypes.join(", ")}`
      );
    }
  },
};

export const validateUserData = (data: {
  name?: string;
  phone?: string;
  address?: string;
}): void => {
  if (data.name !== undefined) {
    validators.required(data.name, "Name");
  }

  if (data.phone !== undefined) {
    validators.required(data.phone, "Phone");
    validators.phone(data.phone);
  }

  if (data.address !== undefined) {
    validators.required(data.address, "Address");
  }
};
