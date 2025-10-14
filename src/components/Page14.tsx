import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const Page14: React.FC = () => {
  const navigate = useNavigate();
  const { addTestAnswer } = useFlow();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Map options to color values (a=0, b=1, c=2, d=3)
      const optionToColorMap: { [key: string]: number } = {
        "deep talk corner": 0, // a) green
        "talking about random ideas": 1, // b) purple
        "dance floor hype": 2, // c) yellow
        "helping the host": 3, // d) blue
      };

      const colorValue = optionToColorMap[selectedOption];
      addTestAnswer(6, colorValue); // Question 6

      // Navigate to next page
      navigate("/page15");
    }
  };

  const handleBack = () => {
    navigate("/page13");
  };

  const options = [
    "deep talk corner",
    "talking about random ideas",
    "dance floor hype",
    "helping the host",
  ];

  return (
    <div className="page14-template">
      {/* X button in top left */}
      <button className="page14-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="page14-step-indicator">06</div>

      {/* Main question */}
      <div className="page14-question">AT A PARTY YOU'RE...</div>

      {/* Main character with balloons */}
      <div className="page14-main-character">
        <img
          src="/img6a.webp"
          alt="Main Party Character"
          className="page14-main-character-img"
        />
      </div>

      {/* Options container */}
      <div className="page14-options-container">
        {options.map((option, index) => (
          <div
            key={index}
            className={`page14-option-box ${
              selectedOption === option ? "selected" : ""
            }`}
            onClick={() => setSelectedOption(option)}
          >
            {option.toUpperCase()}
          </div>
        ))}
      </div>

      {/* Bottom characters */}
      <div className="page14-bottom-characters">
        {/* Green character */}
        <div className="page14-bottom-character">
          <img
            src="/img6c.webp"
            alt="Green Party Character"
            className="page14-bottom-character-img"
          />
        </div>

        {/* Purple character */}
        <div className="page14-bottom-character">
          <img
            src="/img6b.webp"
            alt="Purple Party Character"
            className="page14-bottom-character-img"
          />
        </div>
      </div>

      {/* NEXT button at bottom */}
      <button
        className="page14-next-button"
        onClick={handleNext}
        disabled={!selectedOption}
        style={{ opacity: !selectedOption ? 0.6 : 1 }}
      >
        NEXT
      </button>
    </div>
  );
};

export default Page14;
