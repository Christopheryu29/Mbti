// User-related type definitions
export interface UserData {
  name: string;
  phone: string;
  address: string;
  mbti?: string;
  testResults?: TestResults;
  personalityType?: string;
  shirtDesign?: ShirtDesign;
  paymentInfo?: PaymentInfo;
  appointmentDate?: string;
  selectedOtherPatches?: string[];
  selectedItem?: SelectedItem;
}

export interface SelectedItem {
  type: "shirt" | "cap";
  index?: number;
  color?: string;
  size?: string;
  price?: number; // Price in thousands (e.g., 150 = 150k)
}

export interface TestResults {
  green: number;
  purple: number;
  yellow: number;
  blue: number;
}

export interface ShirtDesign {
  template: string;
  position?: string;
}

export interface PaymentInfo {
  method: string;
  amount: number;
  image?: File;
  imageUrl?: string;
}
