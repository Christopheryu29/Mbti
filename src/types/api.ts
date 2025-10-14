// API-related type definitions
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface CompleteOrderData {
  name: string;
  phone: string;
  address: string;
  personalityType: string;
  template: string;
  position?: string;
  paymentImage: File;
}

export interface OrderResult {
  success: boolean;
  paymentImageUrl?: string;
  rowNumber?: number;
  error?: string;
}

export interface UploadResult {
  success: boolean;
  fileId?: string;
  webViewLink?: string;
  error?: string;
}

export interface SheetsResult {
  success: boolean;
  rowNumber?: number;
  error?: string;
}
