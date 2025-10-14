import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GetOtherPatch20: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Navigate to the choose other patch page
      navigate("/choose-other-patch");
    }
  };

  const handleBack = () => {
    navigate("/get-other-patch-19");
  };

  const options = ["CONSTANT CHANGE", "ROUTINE"];

  return (
    <div className="get-other-patch20-template">
      {/* X button in top left */}
      <button className="get-other-patch20-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="get-other-patch20-step-indicator">20</div>

      {/* Light grey content container */}
      <div className="get-other-patch20-content-container">
        {/* Main question */}
        <div className="get-other-patch20-question">
          <div className="get-other-patch20-question-line">
            IS IT HARDER FOR YOU TO ADAPT TO...
          </div>
        </div>

        {/* White options container */}
        <div className="get-other-patch20-options-container">
          {options.map((option, index) => (
            <div
              key={index}
              className={`get-other-patch20-option-box ${
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
        className="get-other-patch20-next-button"
        onClick={handleNext}
        disabled={!selectedOption}
        style={{ opacity: !selectedOption ? 0.6 : 1 }}
      >
        NEXT
      </button>
    </div>
  );
};

export default GetOtherPatch20;
