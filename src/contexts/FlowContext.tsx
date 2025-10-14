import React, { createContext, useContext, useState, ReactNode } from "react";
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
      ([_, score]) => score === maxScore
    );

    // If there's a tie and we have questions 11-12, use them for tie-breaking (2 points each)
    if (tiedColors.length > 1 && testAnswers.length >= 12) {
      for (let i = 10; i < Math.min(12, testAnswers.length); i++) {
        const answer = testAnswers[i];
        if (answer === 0) scores.green += 2; // a) green
        else if (answer === 1) scores.purple += 2; // b) purple
        else if (answer === 2) scores.yellow += 2; // c) yellow
        else if (answer === 3) scores.blue += 2; // d) blue
      }
    }

    // Find the color with the highest score
    const finalMaxScore = Math.max(
      scores.green,
      scores.purple,
      scores.yellow,
      scores.blue
    );
    const winner = Object.entries(scores).find(
      ([_, score]) => score === finalMaxScore
    );

    return winner ? winner[0] : "green"; // default to green if no clear winner
  };

  const resetFlow = () => {
    setUserData({
      name: "",
      phone: "",
      address: "",
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
        resetFlow,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};
