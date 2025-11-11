import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GetOtherPatch18: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Navigate to the next question page
      navigate("/get-other-patch-19");
    }
  };

  const handleBack = () => {
    navigate("/get-other-patch-17");
  };

  const options = ["A PRACTICAL PERSON", "AN INGENIOUS PERSON"];

  return (
    <div className="get-other-patch18-template">
      {/* X button in top left */}
      <button className="get-other-patch3-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="get-other-patch3-step-indicator">18</div>

      {/* Main question */}
      <div className="get-other-patch3-question">
        <div className="get-other-patch3-question-line">WOULD YOU RATHER</div>
        <div className="get-other-patch3-question-line">BE CONSIDERED...</div>
      </div>

      {/* Options container */}
      <div className="get-other-patch3-options-container">
        {options.map((option, index) => (
          <div
            key={index}
            className={`get-other-patch3-option-box ${
              selectedOption === option ? "selected" : ""
            }`}
            onClick={() => setSelectedOption(option)}
          >
            {option}
          </div>
        ))}
      </div>

      {/* NEXT button at bottom */}
      <button
        className="get-other-patch3-next-button"
        onClick={handleNext}
        disabled={!selectedOption}
        style={{ opacity: !selectedOption ? 0.6 : 1 }}
      >
        NEXT
      </button>
    </div>
  );
};

export default GetOtherPatch18;
