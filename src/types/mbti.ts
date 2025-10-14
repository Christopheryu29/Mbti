// MBTI-related type definitions
export interface MBTIScore {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
}

export interface MBTIResult {
  type: string;
  scores: MBTIScore;
}

export interface QuestionAnswer {
  questionNumber: number;
  selectedOption: "A" | "B";
}

export type PersonalityColor = "green" | "purple" | "yellow" | "blue";

export interface ColorTestScore {
  green: number;
  purple: number;
  yellow: number;
  blue: number;
}
