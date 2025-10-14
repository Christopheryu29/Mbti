import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const Page20: React.FC = () => {
  const navigate = useNavigate();
  const { addTestAnswer, calculatePersonalityType, updateUserData } = useFlow();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Map options to color values (a=0, b=1, c=2, d=3)
      const optionToColorMap: { [key: string]: number } = {
        "make everyone feel heard": 0, // a) green
        "set up a system": 1, // b) purple
        "hype up the team": 2, // c) yellow
        "give clear steps": 3, // d) blue
      };

      const colorValue = optionToColorMap[selectedOption];
      addTestAnswer(12, colorValue); // Question 12 (tie-breaker, 2 points)

      // Calculate final personality type and save to user data
      const personalityType = calculatePersonalityType();
      updateUserData({ personalityType });

      // Navigate to personality result page
      navigate("/personality-result");
    }
  };

  const handleBack = () => {
    navigate("/page19");
  };

  const options = [
    "make everyone feel heard",
    "set up a system",
    "hype up the team",
    "give clear steps",
  ];

  return (
    <div className="page20-template">
      {/* X button in top left */}
      <button className="page20-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="page20-step-indicator">12</div>

      {/* Main question */}
      <div className="page20-question">IF YOU'RE LEADING A TEAM, YOU...</div>

      {/* Team leader characters */}
      <div className="page20-characters">
        <img
          src="/img12.webp"
          alt="Team Leader Characters"
          className="page20-characters-img"
        />
      </div>

      {/* Options container */}
      <div className="page20-options-container">
        {options.map((option, index) => (
          <div
            key={index}
            className={`page20-option-box ${
              selectedOption === option ? "selected" : ""
            }`}
            onClick={() => setSelectedOption(option)}
          >
            {option.toUpperCase()}
          </div>
        ))}
      </div>

      {/* NEXT button at bottom */}
      <button
        className="page20-next-button"
        onClick={handleNext}
        disabled={!selectedOption}
      >
        NEXT
      </button>
    </div>
  );
};

export default Page20;
