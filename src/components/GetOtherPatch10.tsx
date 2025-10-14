import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GetOtherPatch10: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Navigate to the next question page
      navigate("/get-other-patch-11");
    }
  };

  const handleBack = () => {
    navigate("/get-other-patch-9");
  };

  const options = ["COMMON<br/>SENSE", "VISION"];

  return (
    <div className="get-other-patch10-template">
      {/* X button in top left */}
      <button className="get-other-patch10-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="get-other-patch10-step-indicator">10</div>

      {/* Light grey content container */}
      <div className="get-other-patch10-content-container">
        {/* Main question */}
        <div className="get-other-patch10-question">
          <div className="get-other-patch10-question-line">
            IS IT HIGHER PRAISE TO
          </div>
          <div className="get-other-patch10-question-line">SAY SOMEONE HAS</div>
        </div>

        {/* White options container */}
        <div className="get-other-patch10-options-container">
          {options.map((option, index) => (
            <div
              key={index}
              className={`get-other-patch10-option-box ${
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
        className="get-other-patch10-next-button"
        onClick={handleNext}
        disabled={!selectedOption}
        style={{ opacity: !selectedOption ? 0.6 : 1 }}
      >
        NEXT
      </button>
    </div>
  );
};

export default GetOtherPatch10;
