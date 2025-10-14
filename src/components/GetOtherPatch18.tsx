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

  const options = ["A PRACTICAL<br/>PERSON", "AN INGENIOUS<br/>PERSON"];

  return (
    <div className="get-other-patch18-template">
      {/* X button in top left */}
      <button className="get-other-patch18-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="get-other-patch18-step-indicator">18</div>

      {/* Light grey content container */}
      <div className="get-other-patch18-content-container">
        {/* Main question */}
        <div className="get-other-patch18-question">
          <div className="get-other-patch18-question-line">
            WOULD YOU RATHER
          </div>
          <div className="get-other-patch18-question-line">
            BE CONSIDERED...
          </div>
        </div>

        {/* White options container */}
        <div className="get-other-patch18-options-container">
          {options.map((option, index) => (
            <div
              key={index}
              className={`get-other-patch18-option-box ${
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
        className="get-other-patch18-next-button"
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
