import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GetOtherPatch7: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Navigate to the next question page
      navigate("/get-other-patch-8");
    }
  };

  const handleBack = () => {
    navigate("/get-other-patch-6");
  };

  const options = ["FORESIGHT", "COMPASSION"];

  return (
    <div className="get-other-patch7-template">
      {/* X button in top left */}
      <button className="get-other-patch7-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="get-other-patch7-step-indicator">07</div>

      {/* Light grey content container */}
      <div className="get-other-patch7-content-container">
        {/* Main question */}
        <div className="get-other-patch7-question">
          <div className="get-other-patch7-question-line">
            WHICH WORD IN THE PAIR
          </div>
          <div className="get-other-patch7-question-line">
            APPEALS TO YOU MORE?
          </div>
        </div>

        {/* White options container */}
        <div className="get-other-patch7-options-container">
          {options.map((option, index) => (
            <div
              key={index}
              className={`get-other-patch7-option-box ${
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
        className="get-other-patch7-next-button"
        onClick={handleNext}
        disabled={!selectedOption}
        style={{ opacity: !selectedOption ? 0.6 : 1 }}
      >
        NEXT
      </button>
    </div>
  );
};

export default GetOtherPatch7;
