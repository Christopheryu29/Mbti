import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const Page11: React.FC = () => {
  const navigate = useNavigate();
  const { addTestAnswer } = useFlow();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Map options to color values (a=0, b=1, c=2, d=3)
      const optionToColorMap: { [key: string]: number } = {
        calm: 0, // a) green
        curious: 1, // b) purple
        playful: 2, // c) yellow
        reliable: 3, // d) blue
      };

      const colorValue = optionToColorMap[selectedOption];
      addTestAnswer(3, colorValue); // Question 3

      // Navigate to next page
      navigate("/page12");
    }
  };

  const handleBack = () => {
    navigate("/page10");
  };

  const options = ["calm", "curious", "playful", "reliable"];

  return (
    <div className="page11-template">
      {/* X button in top left */}
      <button className="page11-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="page11-step-indicator">03</div>

      {/* Main question */}
      <div className="page11-question">DAILY MOOD CHECK</div>

      {/* Character image */}
      <div className="page11-character">
        <img 
          src="/img3.webp" 
          alt="Mood Characters" 
          className="page11-character-img"
        />
      </div>

      {/* Options container */}
      <div className="page11-options-container">
        {options.map((option, index) => (
          <div
            key={index}
            className={`page11-option-box ${
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
        className="page11-next-button"
        onClick={handleNext}
        disabled={!selectedOption}
        style={{ opacity: !selectedOption ? 0.6 : 1 }}
      >
        NEXT
      </button>
    </div>
  );
};

export default Page11;
