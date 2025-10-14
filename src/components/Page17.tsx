import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const Page17: React.FC = () => {
  const navigate = useNavigate();
  const { addTestAnswer } = useFlow();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Map options to color values (a=0, b=1, c=2, d=3)
      const optionToColorMap: { [key: string]: number } = {
        "the vibes": 0, // a) green
        "the system": 1, // b) purple
        "the fun stuff": 2, // c) yellow
        "the rules": 3, // d) blue
      };

      const colorValue = optionToColorMap[selectedOption];
      addTestAnswer(9, colorValue); // Question 9

      // Navigate to next page
      navigate("/page18");
    }
  };

  const handleBack = () => {
    navigate("/page16");
  };

  const options = ["the vibes", "the system", "the fun stuff", "the rules"];

  return (
    <div className="page17-template">
      {/* X button in top left */}
      <button className="page17-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="page17-step-indicator">09</div>

      {/* Main question */}
      <div className="page17-question">
        <div className="page17-question-line">FIRST THING</div>
        <div className="page17-question-line">YOU NOTICE IN</div>
        <div className="page17-question-line">A NEW PLACE ?</div>
      </div>

      {/* Options container */}
      <div className="page17-options-container">
        {options.map((option, index) => (
          <div
            key={index}
            className={`page17-option-box ${
              selectedOption === option ? "selected" : ""
            }`}
            onClick={() => setSelectedOption(option)}
          >
            {option.toUpperCase()}
          </div>
        ))}
      </div>

      {/* Character in bottom right */}
      <div className="page17-character">
        <img
          src="/cropped-img9.webp"
          alt="Detective Character"
          className="page17-character-img"
        />
      </div>

      {/* NEXT button at bottom */}
      <button
        className="page17-next-button"
        onClick={handleNext}
        disabled={!selectedOption}
      >
        NEXT
      </button>
    </div>
  );
};

export default Page17;
