import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GetOtherPatch17: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Navigate to the next question page
      navigate("/get-other-patch-18");
    }
  };

  const handleBack = () => {
    navigate("/get-other-patch-16");
  };

  const options = ["ALWAYS HAVE FUN", "SOMETIMES GET BORED"];

  return (
    <div className="get-other-patch17-template">
      {/* X button in top left */}
      <button className="get-other-patch3-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="get-other-patch3-step-indicator">17</div>

      {/* Main question */}
      <div className="get-other-patch3-question">
        <div className="get-other-patch3-question-line">AT PARTIES,</div>
        <div className="get-other-patch3-question-line">DO YOU...</div>
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

export default GetOtherPatch17;
