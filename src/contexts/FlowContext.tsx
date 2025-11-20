import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { UserData } from "../types";

interface FlowContextType {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  testAnswers: number[];
  setTestAnswers: (answers: number[]) => void;
  addTestAnswer: (questionNumber: number, answer: number) => void;
  calculatePersonalityType: () => string;
  calculatePersonalityTypeWithQ10: (question10Answer?: number) => string;
  calculatePersonalityTypeWithTieBreakers: (question11Answer?: number, question12Answer?: number) => string;
  hasTieAfterQuestion10: (question10Answer?: number) => boolean;
  resetFlow: () => void;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);

export const useFlow = () => {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error("useFlow must be used within a FlowProvider");
  }
  return context;
};

interface FlowProviderProps {
  children: ReactNode;
}

export const FlowProvider: React.FC<FlowProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    phone: "",
    address: "",
    personalityType: "green", // Default to Harmonizer
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [testAnswers, setTestAnswers] = useState<number[]>([]);

  const updateUserData = (data: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...data }));
  };

  const addTestAnswer = (questionNumber: number, answer: number) => {
    setTestAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[questionNumber - 1] = answer; // questionNumber is 1-based, array is 0-based
      return newAnswers;
    });
  };

  // Helper function to check if there's a tie after questions 1-10
  // Optionally accepts question10Answer to include it in the calculation
  const hasTieAfterQuestion10 = (question10Answer?: number): boolean => {
    const scores = { green: 0, purple: 0, yellow: 0, blue: 0 };

    // Questions 1-9: 1 point each (indices 0-8)
    for (let i = 0; i < Math.min(9, testAnswers.length); i++) {
      const answer = testAnswers[i];
      if (answer === 0) scores.green += 1; // a) green
      else if (answer === 1) scores.purple += 1; // b) purple
      else if (answer === 2) scores.yellow += 1; // c) yellow
      else if (answer === 3) scores.blue += 1; // d) blue
    }

    // Add question 10 if provided, otherwise use from testAnswers if available
    const q10Answer = question10Answer !== undefined 
      ? question10Answer 
      : (testAnswers.length >= 10 ? testAnswers[9] : undefined);
    
    if (q10Answer !== undefined) {
      if (q10Answer === 0) scores.green += 1; // a) green
      else if (q10Answer === 1) scores.purple += 1; // b) purple
      else if (q10Answer === 2) scores.yellow += 1; // c) yellow
      else if (q10Answer === 3) scores.blue += 1; // d) blue
    }

    // Check if there's a tie after questions 1-10
    const maxScore = Math.max(
      scores.green,
      scores.purple,
      scores.yellow,
      scores.blue
    );
    const tiedColors = Object.entries(scores).filter(
      ([, score]) => score === maxScore
    );

    return tiedColors.length > 1; // Return true if there's a tie
  };

  // Helper function to calculate personality type with optional question 10 answer
  const calculatePersonalityTypeWithQ10 = (question10Answer?: number): string => {
    const scores = { green: 0, purple: 0, yellow: 0, blue: 0 };

    // Questions 1-9: 1 point each (indices 0-8)
    for (let i = 0; i < Math.min(9, testAnswers.length); i++) {
      const answer = testAnswers[i];
      if (answer === 0) scores.green += 1; // a) green
      else if (answer === 1) scores.purple += 1; // b) purple
      else if (answer === 2) scores.yellow += 1; // c) yellow
      else if (answer === 3) scores.blue += 1; // d) blue
    }

    // Add question 10 if provided, otherwise use from testAnswers if available
    const q10Answer = question10Answer !== undefined 
      ? question10Answer 
      : (testAnswers.length >= 10 ? testAnswers[9] : undefined);
    
    if (q10Answer !== undefined) {
      if (q10Answer === 0) scores.green += 1; // a) green
      else if (q10Answer === 1) scores.purple += 1; // b) purple
      else if (q10Answer === 2) scores.yellow += 1; // c) yellow
      else if (q10Answer === 3) scores.blue += 1; // d) blue
    }

    // Find the color with the highest score (no tie-breaking needed if no tie)
    const finalMaxScore = Math.max(
      scores.green,
      scores.purple,
      scores.yellow,
      scores.blue
    );
    const tiedWinners = Object.entries(scores).filter(
      ([, score]) => score === finalMaxScore
    );

    // If there's a tie, choose the first one in a consistent order
    // Order: green, purple, yellow, blue
    if (tiedWinners.length > 0) {
      return tiedWinners[0][0];
    }

    return "green"; // default to green if no winner found
  };

  const calculatePersonalityType = (): string => {
    const scores = { green: 0, purple: 0, yellow: 0, blue: 0 };

    // Questions 1-10: 1 point each
    for (let i = 0; i < Math.min(10, testAnswers.length); i++) {
      const answer = testAnswers[i];
      if (answer === 0) scores.green += 1; // a) green
      else if (answer === 1) scores.purple += 1; // b) purple
      else if (answer === 2) scores.yellow += 1; // c) yellow
      else if (answer === 3) scores.blue += 1; // d) blue
    }

    // Check if there's a tie after questions 1-10
    const maxScore = Math.max(
      scores.green,
      scores.purple,
      scores.yellow,
      scores.blue
    );
    const tiedColors = Object.entries(scores).filter(
      ([, score]) => score === maxScore
    );

    // If there's a tie and we have questions 11-12, use them for tie-breaking (2 points each)
    if (tiedColors.length > 1 && testAnswers.length >= 12) {
      for (let i = 10; i < Math.min(12, testAnswers.length); i++) {
        const answer = testAnswers[i];
        // Only process if answer is defined (not undefined)
        if (answer !== undefined) {
          if (answer === 0) scores.green += 2; // a) green
          else if (answer === 1) scores.purple += 2; // b) purple
          else if (answer === 2) scores.yellow += 2; // c) yellow
          else if (answer === 3) scores.blue += 2; // d) blue
        }
      }
    }

    // Find the color with the highest score
    const finalMaxScore = Math.max(
      scores.green,
      scores.purple,
      scores.yellow,
      scores.blue
    );
    const tiedWinners = Object.entries(scores).filter(
      ([, score]) => score === finalMaxScore
    );

    // If there's still a tie after tie-breakers, choose the first one in a consistent order
    // Order: green, purple, yellow, blue
    if (tiedWinners.length > 0) {
      return tiedWinners[0][0];
    }

    return "green"; // default to green if no winner found
  };

  // Helper function to calculate personality type with tie-breaker answers passed directly
  // This avoids React state update timing issues
  const calculatePersonalityTypeWithTieBreakers = (
    question11Answer?: number,
    question12Answer?: number
  ): string => {
    const scores = { green: 0, purple: 0, yellow: 0, blue: 0 };

    // Questions 1-10: 1 point each
    for (let i = 0; i < Math.min(10, testAnswers.length); i++) {
      const answer = testAnswers[i];
      if (answer === 0) scores.green += 1; // a) green
      else if (answer === 1) scores.purple += 1; // b) purple
      else if (answer === 2) scores.yellow += 1; // c) yellow
      else if (answer === 3) scores.blue += 1; // d) blue
    }

    // Check if there's a tie after questions 1-10
    const maxScore = Math.max(
      scores.green,
      scores.purple,
      scores.yellow,
      scores.blue
    );
    const tiedColors = Object.entries(scores).filter(
      ([, score]) => score === maxScore
    );

    // If there's a tie and we have tie-breaker answers, use them (2 points each)
    if (tiedColors.length > 1) {
      // Use question 11 answer if provided, otherwise try to get from state
      const q11Answer = question11Answer !== undefined 
        ? question11Answer 
        : (testAnswers.length >= 11 ? testAnswers[10] : undefined);
      
      // Use question 12 answer if provided, otherwise try to get from state
      const q12Answer = question12Answer !== undefined 
        ? question12Answer 
        : (testAnswers.length >= 12 ? testAnswers[11] : undefined);

      if (q11Answer !== undefined) {
        if (q11Answer === 0) scores.green += 2; // a) green
        else if (q11Answer === 1) scores.purple += 2; // b) purple
        else if (q11Answer === 2) scores.yellow += 2; // c) yellow
        else if (q11Answer === 3) scores.blue += 2; // d) blue
      }

      if (q12Answer !== undefined) {
        if (q12Answer === 0) scores.green += 2; // a) green
        else if (q12Answer === 1) scores.purple += 2; // b) purple
        else if (q12Answer === 2) scores.yellow += 2; // c) yellow
        else if (q12Answer === 3) scores.blue += 2; // d) blue
      }
    }

    // Find the color with the highest score
    const finalMaxScore = Math.max(
      scores.green,
      scores.purple,
      scores.yellow,
      scores.blue
    );
    const tiedWinners = Object.entries(scores).filter(
      ([, score]) => score === finalMaxScore
    );

    // If there's still a tie after tie-breakers, choose the first one in a consistent order
    // Order: green, purple, yellow, blue
    if (tiedWinners.length > 0) {
      return tiedWinners[0][0];
    }

    return "green"; // default to green if no winner found
  };

  const resetFlow = () => {
    setUserData({
      name: "",
      phone: "",
      address: "",
      personalityType: "green", // Default to Harmonizer
    });
    setCurrentStep(1);
    setTestAnswers([]);
  };

  return (
    <FlowContext.Provider
      value={{
        userData,
        updateUserData,
        currentStep,
        setCurrentStep,
        testAnswers,
        setTestAnswers,
        addTestAnswer,
        calculatePersonalityType,
        calculatePersonalityTypeWithQ10,
        calculatePersonalityTypeWithTieBreakers,
        hasTieAfterQuestion10,
        resetFlow,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};
