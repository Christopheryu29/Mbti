import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GetOtherPatch19: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Navigate to the next question page
      navigate("/get-other-patch-20");
    }
  };

  const handleBack = () => {
    navigate("/get-other-patch-18");
  };

  const options = [
    "A CONSISTENTLY<br/>REASONABLE<br/>PERSON",
    "A PERSON OF<br/>REAL<br/>FEELING",
  ];

  return (
    <div className="get-other-patch19-template">
      {/* X button in top left */}
      <button className="get-other-patch19-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="get-other-patch19-step-indicator">19</div>

      {/* Light grey content container */}
      <div className="get-other-patch19-content-container">
        {/* Main question */}
        <div className="get-other-patch19-question">
          <div className="get-other-patch19-question-line">IS IT A HIGHER</div>
          <div className="get-other-patch19-question-line">
            COMPLIMENT TO BE
          </div>
          <div className="get-other-patch19-question-line">CALLED...</div>
        </div>

        {/* White options container */}
        <div className="get-other-patch19-options-container">
          {options.map((option, index) => (
            <div
              key={index}
              className={`get-other-patch19-option-box ${
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
        className="get-other-patch19-next-button"
        onClick={handleNext}
        disabled={!selectedOption}
        style={{ opacity: !selectedOption ? 0.6 : 1 }}
      >
        NEXT
      </button>
    </div>
  );
};

export default GetOtherPatch19;
