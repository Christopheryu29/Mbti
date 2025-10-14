import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GetOtherPatch15: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Navigate to the next question page
      navigate("/get-other-patch-16");
    }
  };

  const handleBack = () => {
    navigate("/get-other-patch-14");
  };

  const options = ["THINKING", "FEELING"];

  return (
    <div className="get-other-patch15-template">
      {/* X button in top left */}
      <button className="get-other-patch15-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="get-other-patch15-step-indicator">15</div>

      {/* Light grey content container */}
      <div className="get-other-patch15-content-container">
        {/* Main question */}
        <div className="get-other-patch15-question">
          <div className="get-other-patch15-question-line">
            WHICH WORD IN THE
          </div>
          <div className="get-other-patch15-question-line">PAIR APPEALS TO</div>
          <div className="get-other-patch15-question-line">YOU MORE...</div>
        </div>

        {/* White options container */}
        <div className="get-other-patch15-options-container">
          {options.map((option, index) => (
            <div
              key={index}
              className={`get-other-patch15-option-box ${
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
        className="get-other-patch15-next-button"
        onClick={handleNext}
        disabled={!selectedOption}
        style={{ opacity: !selectedOption ? 0.6 : 1 }}
      >
        NEXT
      </button>
    </div>
  );
};

export default GetOtherPatch15;
