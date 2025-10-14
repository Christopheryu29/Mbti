import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const Page10: React.FC = () => {
  const navigate = useNavigate();
  const { addTestAnswer } = useFlow();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Map options to color values (a=0, b=1, c=2, d=3)
      const optionToColorMap: { [key: string]: number } = {
        "chill + journaling": 0, // a) green
        "watch science": 1, // b) purple
        "random road trip": 2, // c) yellow
        "helping friends / fam": 3, // d) blue
      };

      const colorValue = optionToColorMap[selectedOption];
      addTestAnswer(2, colorValue); // Question 2

      // Navigate to next page
      navigate("/page11");
    }
  };

  const handleBack = () => {
    navigate("/page9");
  };

  const options = [
    "chill + journaling",
    "watch science",
    "random road trip",
    "helping friends / fam",
  ];

  return (
    <div className="page10-template">
      {/* X button in top left */}
      <button className="page10-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="page10-step-indicator">02</div>

      {/* Main question */}
      <div className="page10-question">IDEAL WEEKEND?</div>

      {/* Character image */}
      <div className="page10-character">
        <img
          src="/img2.webp"
          alt="Sleeping Character"
          className="page10-character-img"
        />
      </div>

      {/* Options container */}
      <div className="page10-options-container">
        {options.map((option, index) => (
          <div
            key={index}
            className={`page10-option-box ${
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
        className="page10-next-button"
        onClick={handleNext}
        disabled={!selectedOption}
        style={{ opacity: !selectedOption ? 0.6 : 1 }}
      >
        NEXT
      </button>
    </div>
  );
};

export default Page10;
