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

  const options = ["COMMON SENSE", "VISION"];

  return (
    <div className="get-other-patch10-template">
      {/* X button in top left */}
      <button className="get-other-patch3-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="get-other-patch3-step-indicator">10</div>

      {/* Main question */}
      <div className="get-other-patch3-question">
        <div className="get-other-patch3-question-line">
          IS IT HIGHER PRAISE TO
        </div>
        <div className="get-other-patch3-question-line">SAY SOMEONE HAS</div>
      </div>

      {/* Options container */}
      <div className="get-other-patch3-options-container">
        {options.map((option, index) => (
          <div
            key={index}
            className={`get-other-patch3-option-box ${
              selectedOption === option ? "selected" : ""
            }`}
            onClick={() => setSelectedOption(option)}
          >
            {option}
          </div>
        ))}

        {/* Image at bottom right of option box */}
        <img
          src="/n10.webp"
          alt="Character illustration"
          className="get-other-patch10-image-bottom-right"
        />
      </div>

      {/* NEXT button at bottom */}
      <button
        className="get-other-patch3-next-button"
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
