import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const Page12: React.FC = () => {
  const navigate = useNavigate();
  const { addTestAnswer } = useFlow();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Map options to color values (a=0, b=1, c=2, d=3)
      const optionToColorMap: { [key: string]: number } = {
        "follow your heart": 0, // a) green
        "think of solutions": 1, // b) purple
        "go with the flow": 2, // c) yellow
        "fix it step by step": 3, // d) blue
      };

      const colorValue = optionToColorMap[selectedOption];
      addTestAnswer(4, colorValue); // Question 4

      // Navigate to next page
      navigate("/page13");
    }
  };

  const handleBack = () => {
    navigate("/page11");
  };

  const options = [
    "follow your heart",
    "think of solutions",
    "go with the flow",
    "fix it step by step",
  ];

  return (
    <div className="page12-template">
      {/* X button in top left */}
      <button className="page12-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="page12-step-indicator">04</div>

      {/* Main question with character */}
      <div className="page12-question-container">
        <div className="page12-question">
          <div className="page12-question-line">WHEN LIFE</div>
          <div className="page12-question-line">GETS MESSY,</div>
          <div className="page12-question-line">YOU...</div>
        </div>

        {/* Character image beside title */}
        <div className="page12-title-character">
          <img
            src="/img4.webp"
            alt="Messy Character"
            className="page12-title-character-img"
          />
        </div>
      </div>

      {/* Distressed character */}

      {/* Options container */}
      <div className="page12-options-container">
        {options.map((option, index) => (
          <div
            key={index}
            className={`page12-option-box ${
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
        className="page12-next-button"
        onClick={handleNext}
        disabled={!selectedOption}
        style={{ opacity: !selectedOption ? 0.6 : 1 }}
      >
        NEXT
      </button>
    </div>
  );
};

export default Page12;
