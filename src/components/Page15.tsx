import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const Page15: React.FC = () => {
  const navigate = useNavigate();
  const { addTestAnswer } = useFlow();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Map options to color values (a=0, b=1, c=2, d=3)
      const optionToColorMap: { [key: string]: number } = {
        caring: 0, // a) green
        smart: 1, // b) purple
        fun: 2, // c) yellow
        responsible: 3, // d) blue
      };

      const colorValue = optionToColorMap[selectedOption];
      addTestAnswer(7, colorValue); // Question 7

      // Navigate to next page
      navigate("/page16");
    }
  };

  const handleBack = () => {
    navigate("/page14");
  };

  const options = ["caring", "smart", "fun", "responsible"];

  return (
    <div className="page15-template">
      {/* X button in top left */}
      <button className="page15-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="page15-step-indicator">07</div>

      {/* Main question with top characters */}
      <div className="page15-question-container">
        <div className="page15-question">
          <div className="page15-question-line">FRIENDS</div>
          <div className="page15-question-line">CALL</div>
          <div className="page15-question-line">YOU...</div>
        </div>

        {/* Top character group beside title */}
        <div className="page15-top-characters">
          <img
            src="/img7a.webp"
            alt="Friendship Characters Top"
            className="page15-top-characters-img"
          />
        </div>
      </div>

      {/* Options container */}
      <div className="page15-options-container">
        {options.map((option, index) => (
          <div
            key={index}
            className={`page15-option-box ${
              selectedOption === option ? "selected" : ""
            }`}
            onClick={() => setSelectedOption(option)}
          >
            {option.toUpperCase()}
          </div>
        ))}
      </div>

      {/* Bottom character group */}
      <div className="page15-bottom-characters">
        <img
          src="/img7b.webp"
          alt="Friendship Characters Bottom"
          className="page15-bottom-characters-img"
        />
      </div>

      {/* NEXT button at bottom */}
      <button
        className="page15-next-button"
        onClick={handleNext}
        disabled={!selectedOption}
        style={{ opacity: !selectedOption ? 0.6 : 1 }}
      >
        NEXT
      </button>
    </div>
  );
};

export default Page15;
