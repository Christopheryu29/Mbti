import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const Page18: React.FC = () => {
  const navigate = useNavigate();
  const { addTestAnswer } = useFlow();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Map options to color values (a=0, b=1, c=2, d=3)
      const optionToColorMap: { [key: string]: number } = {
        "making everyone feel included": 0, // a) green
        "building a good plan": 1, // b) purple
        "throwing creative ideas": 2, // c) yellow
        "keeping tasks on track": 3, // d) blue
      };

      const colorValue = optionToColorMap[selectedOption];
      addTestAnswer(10, colorValue); // Question 10

      // Navigate to next page
      navigate("/page19");
    }
  };

  const handleBack = () => {
    navigate("/page17");
  };

  const options = [
    "making everyone feel included",
    "building a good plan",
    "throwing creative ideas",
    "keeping tasks on track",
  ];

  return (
    <div className="page18-template">
      {/* X button in top left */}
      <button className="page18-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="page18-step-indicator">10</div>

      {/* Main question */}
      <div className="page18-question">
        <div className="page18-question-line">IN A GROUP PROJECT,</div>
        <div className="page18-question-line indented">
          YOU'RE HYPED ABOUT...
        </div>
      </div>

      {/* Top character group */}
      <div className="page18-top-characters">
        <img
          src="/cropped-img10a.webp"
          alt="Group Project Characters"
          className="page18-top-characters-img"
        />
      </div>

      {/* Options container */}
      <div className="page18-options-container">
        {options.map((option, index) => (
          <div
            key={index}
            className={`page18-option-box ${
              selectedOption === option ? "selected" : ""
            }`}
            onClick={() => setSelectedOption(option)}
          >
            {option.toUpperCase()}
          </div>
        ))}
      </div>

      {/* Bottom character group */}
      <div className="page18-bottom-characters">
        <img
          src="/cropped-img10b.webp"
          alt="Castle Building Characters"
          className="page18-bottom-characters-img"
        />
      </div>

      {/* NEXT button at bottom */}
      <button
        className="page18-next-button"
        onClick={handleNext}
        disabled={!selectedOption}
      >
        NEXT
      </button>
    </div>
  );
};

export default Page18;
