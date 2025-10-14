import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GetOtherPatch16: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Navigate to the next question page
      navigate("/get-other-patch-17");
    }
  };

  const handleBack = () => {
    navigate("/get-other-patch-15");
  };

  const options = [
    "NICE TO BE<br/>ABLE TO PLAN<br/>ACCORDINGLY",
    "A LITTLE<br/>UNPLEASANT TO<br/>BE TIED DOWN",
  ];

  return (
    <div className="get-other-patch16-template">
      {/* X button in top left */}
      <button className="get-other-patch16-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="get-other-patch16-step-indicator">16</div>

      {/* Light grey content container */}
      <div className="get-other-patch16-content-container">
        {/* Main question */}
        <div className="get-other-patch16-question">
          <div className="get-other-patch16-question-line">
            WHEN IT IS SETTLED WELL IN
          </div>
          <div className="get-other-patch16-question-line">
            ADVANCE THAT YOU WILL DO A
          </div>
          <div className="get-other-patch16-question-line">
            CERTAIN THING AT A CERTAIN
          </div>
          <div className="get-other-patch16-question-line">
            TIME, DO YOU FIND IT...
          </div>
        </div>

        {/* White options container */}
        <div className="get-other-patch16-options-container">
          {options.map((option, index) => (
            <div
              key={index}
              className={`get-other-patch16-option-box ${
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
        className="get-other-patch16-next-button"
        onClick={handleNext}
        disabled={!selectedOption}
        style={{ opacity: !selectedOption ? 0.6 : 1 }}
      >
        NEXT
      </button>
    </div>
  );
};

export default GetOtherPatch16;
