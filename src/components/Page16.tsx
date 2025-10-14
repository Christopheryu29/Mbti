import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const Page16: React.FC = () => {
  const navigate = useNavigate();
  const { addTestAnswer } = useFlow();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Map options to color values (a=0, b=1, c=2, d=3)
      const optionToColorMap: { [key: string]: number } = {
        "the wise mentor": 0, // a) green
        "the genius hacker": 1, // b) purple
        "the wild adventurer": 2, // c) yellow
        "the loyal protector": 3, // d) blue
      };

      const colorValue = optionToColorMap[selectedOption];
      addTestAnswer(8, colorValue); // Question 8

      // Navigate to next page
      navigate("/page17");
    }
  };

  const handleBack = () => {
    navigate("/page15");
  };

  const options = [
    "the wise mentor",
    "the genius hacker",
    "the wild adventurer",
    "the loyal protector",
  ];

  return (
    <div className="page16-template">
      {/* X button in top left */}
      <button className="page16-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="page16-step-indicator">08</div>

      {/* Main question */}
      <div className="page16-question">
        <div className="page16-question-line">IN A MOVIE</div>
        <div className="page16-question-line indented">YOU'D BE...</div>
      </div>

      {/* Character Illustration */}
      <div className="page16-character">
        <img
          src="/cropped-img8.webp"
          alt="Movie Character"
          className="page16-character-img"
        />
      </div>

      {/* Options container */}
      <div className="page16-options-container">
        {options.map((option, index) => (
          <div
            key={index}
            className={`page16-option-box ${
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
        className="page16-next-button"
        onClick={handleNext}
        disabled={!selectedOption}
      >
        NEXT
      </button>
    </div>
  );
};

export default Page16;
