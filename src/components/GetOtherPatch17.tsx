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
      <button className="get-other-patch17-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="get-other-patch17-step-indicator">17</div>

      {/* Light grey content container */}
      <div className="get-other-patch17-content-container">
        {/* Main question */}
        <div className="get-other-patch17-question">
          <div className="get-other-patch17-question-line">AT PARTIES,</div>
          <div className="get-other-patch17-question-line">DO YOU...</div>
        </div>

        {/* White options container */}
        <div className="get-other-patch17-options-container">
          {options.map((option, index) => (
            <div
              key={index}
              className={`get-other-patch17-option-box ${
                selectedOption === option ? "selected" : ""
              }`}
              onClick={() => setSelectedOption(option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>

      {/* NEXT button at bottom */}
      <button
        className="get-other-patch17-next-button"
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
