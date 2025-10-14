import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const Page13: React.FC = () => {
  const navigate = useNavigate();
  const { addTestAnswer } = useFlow();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Map options to color values (a=0, b=1, c=2, d=3)
      const optionToColorMap: { [key: string]: number } = {
        "chill songs": 0, // a) green
        "focus music": 1, // b) purple
        "hype summer tracks": 2, // c) yellow
        "feel - good classics": 3, // d) blue
      };

      const colorValue = optionToColorMap[selectedOption];
      addTestAnswer(5, colorValue); // Question 5

      // Navigate to next page
      navigate("/page14");
    }
  };

  const handleBack = () => {
    navigate("/page12");
  };

  const options = [
    "chill songs",
    "focus music",
    "hype summer tracks",
    "feel - good classics",
  ];

  return (
    <div className="page13-template">
      {/* X button in top left */}
      <button className="page13-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="page13-step-indicator">05</div>

      {/* Main question */}
      <div className="page13-question">
        <div className="page13-question-line">YOUR LIFE</div>
        <div className="page13-question-line">PLAYLIST =</div>
      </div>

      {/* Top left character */}
      <div className="page13-character-top">
        <img
          src="/cropped-img5a.webp"
          alt="Music Character Top"
          className="page13-character-img"
        />
      </div>

      {/* Options container */}
      <div className="page13-options-container">
        {options.map((option, index) => (
          <div
            key={index}
            className={`page13-option-box ${
              selectedOption === option ? "selected" : ""
            }`}
            onClick={() => setSelectedOption(option)}
          >
            {option.toUpperCase()}
          </div>
        ))}
      </div>

      {/* Bottom right character */}
      <div className="page13-character-bottom">
        <img
          src="/cropped-img5b.webp"
          alt="Music Character Bottom"
          className="page13-character-img"
        />
      </div>

      {/* NEXT button at bottom */}
      <button
        className="page13-next-button"
        onClick={handleNext}
        disabled={!selectedOption}
        style={{ opacity: !selectedOption ? 0.6 : 1 }}
      >
        NEXT
      </button>
    </div>
  );
};

export default Page13;
