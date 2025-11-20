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
  itemType: string; // "shirt" or "cap"
  color: string;
  size?: string; // Only for shirts
  template: string;
  position?: string;
  price: number;
  orderSummary: string; // Formatted summary like "T-shirt Black S-M Sleeve Left"
  paymentImage: File;
  selectedPatches?: Array<{ patchId: string; quantity: number }>; // Selected patches with quantities
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
