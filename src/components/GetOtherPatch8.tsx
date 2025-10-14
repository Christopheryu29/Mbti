import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GetOtherPatch8: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Navigate to the next question page
      navigate("/get-other-patch-9");
    }
  };

  const handleBack = () => {
    navigate("/get-other-patch-7");
  };

  const options = [
    "ARRANGE DATES,<br/>PARTIES, ETC.,<br/>WELL IN<br/>ADVANCE,",
    "BE FREE TO DO<br/>WHATEVER LOOKS<br/>LIKE FUN WHEN<br/>THE TIME COMES",
  ];

  return (
    <div className="get-other-patch8-template">
      {/* X button in top left */}
      <button className="get-other-patch8-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="get-other-patch8-step-indicator">08</div>

      {/* Light grey content container */}
      <div className="get-other-patch8-content-container">
        {/* Main question */}
        <div className="get-other-patch8-question">
          <div className="get-other-patch8-question-line">
            DO YOU PREFER TO...
          </div>
        </div>

        {/* White options container */}
        <div className="get-other-patch8-options-container">
          {options.map((option, index) => (
            <div
              key={index}
              className={`get-other-patch8-option-box ${
                selectedOption === option ? "selected" : ""
              }`}
              onClick={() => setSelectedOption(option)}
              dangerouslySetInnerHTML={{ __html: option }}
            ></div>
          ))}
        </div>
      </div>

      {/* NEXT button at bottom */}
      <button
        className="get-other-patch8-next-button"
        onClick={handleNext}
        disabled={!selectedOption}
        style={{ opacity: !selectedOption ? 0.6 : 1 }}
      >
        NEXT
      </button>
    </div>
  );
};

export default GetOtherPatch8;
