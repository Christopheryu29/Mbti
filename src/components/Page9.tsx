import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const Page9: React.FC = () => {
  const navigate = useNavigate();
  const { addTestAnswer } = useFlow();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Map options to color values (a=0, b=1, c=2, d=3)
      const optionToColorMap: { [key: string]: number } = {
        "the dreamer": 0, // a) green
        "the thinker": 1, // b) purple
        "the chill explorer": 2, // c) yellow
        "the steady one": 3, // d) blue
      };

      const colorValue = optionToColorMap[selectedOption];
      addTestAnswer(1, colorValue); // Question 1

      // Navigate to next page
      navigate("/page10");
    }
  };

  const handleBack = () => {
    navigate("/mbti-test");
  };

  const options = [
    "the dreamer",
    "the thinker",
    "the chill explorer",
    "the steady one",
  ];

  return (
    <div className="page9-template">
      {/* Top left circle placeholder */}
      <div className="page9-top-left-circle"></div>

      {/* Step indicator in top right */}
      <div className="page9-step-indicator">01</div>

      {/* Main question */}
      <div className="page9-question">
        <div className="page9-question-line">WHICH VIBE</div>
        <div className="page9-question-line">FEELS MOST</div>
        <div className="page9-question-line">LIKE 'YOU'?</div>
      </div>

      {/* Options container with character */}
      <div className="page9-options-container">
        <div className="page9-options-wrapper">
          {options.map((option, index) => (
            <div
              key={index}
              className={`page9-option-box ${
                selectedOption === option ? "selected" : ""
              }`}
              onClick={() => setSelectedOption(option)}
            >
              {option.toUpperCase()}
            </div>
          ))}
        </div>

        {/* Character image */}
        <div className="page9-character">
          <img
            src="/img1a.webp"
            alt="Character"
            className="page9-character-img"
          />
        </div>
      </div>

      {/* NEXT button at bottom */}
      <button
        className="page9-next-button"
        onClick={handleNext}
        disabled={!selectedOption}
        style={{ opacity: !selectedOption ? 0.6 : 1 }}
      >
        NEXT
      </button>
    </div>
  );
};

export default Page9;
