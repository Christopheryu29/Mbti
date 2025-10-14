import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const Page19: React.FC = () => {
  const navigate = useNavigate();
  const { addTestAnswer } = useFlow();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Map options to color values (a=0, b=1, c=2, d=3)
      const optionToColorMap: { [key: string]: number } = {
        "trust your gut": 0, // a) green
        "break it down logically": 1, // b) purple
        "jump in & figure it out": 2, // c) yellow
        "make a quick plan": 3, // d) blue
      };

      const colorValue = optionToColorMap[selectedOption];
      addTestAnswer(11, colorValue); // Question 11 (tie-breaker, 2 points)

      // Navigate to next page
      navigate("/page20");
    }
  };

  const handleBack = () => {
    navigate("/page18");
  };

  const options = [
    "trust your gut",
    "break it down logically",
    "jump in & figure it out",
    "make a quick plan",
  ];

  return (
    <div className="page19-template">
      {/* X button in top left */}
      <button className="page19-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="page19-step-indicator">11</div>

      {/* Main question */}
      <div className="page19-question">
        <div className="page19-question-line">FACED WITH</div>
        <div className="page19-question-line">SOMETHING</div>
        <div className="page19-question-line">TOTALLY NEW,</div>
        <div className="page19-question-line">YOU'D...</div>
      </div>

      {/* Character */}
      <div className="page19-character">
        <img
          src="/img11.webp"
          alt="Curious Character"
          className="page19-character-img"
        />
      </div>

      {/* Options container */}
      <div className="page19-options-container">
        {options.map((option, index) => (
          <div
            key={index}
            className={`page19-option-box ${
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
        className="page19-next-button"
        onClick={handleNext}
        disabled={!selectedOption}
      >
        NEXT
      </button>
    </div>
  );
};

export default Page19;
