import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GetOtherPatch13: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Navigate to the next question page
      navigate("/get-other-patch-14");
    }
  };

  const handleBack = () => {
    navigate("/get-other-patch-12");
  };

  const options = [
    "BROAD FRIENDSHIPS WITH MANY DIFFERENT PEOPLE",
    "DEEP FRIENDSHIPS WITH A VERY FEW PEOPLE",
  ];

  return (
    <div className="get-other-patch13-template">
      {/* X button in top left */}
      <button className="get-other-patch13-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="get-other-patch13-step-indicator">13</div>

      {/* Light grey content container */}
      <div className="get-other-patch13-content-container">
        {/* Main question */}
        <div className="get-other-patch13-question">
          <div className="get-other-patch13-question-line">
            DO YOU TEND TO HAVE...
          </div>
        </div>

        {/* White options container */}
        <div className="get-other-patch13-options-container">
          {options.map((option, index) => (
            <div
              key={index}
              className={`get-other-patch13-option-box ${
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
        className="get-other-patch13-next-button"
        onClick={handleNext}
        disabled={!selectedOption}
        style={{ opacity: !selectedOption ? 0.6 : 1 }}
      >
        NEXT
      </button>
    </div>
  );
};

export default GetOtherPatch13;
