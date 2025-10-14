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
