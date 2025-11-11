import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GetOtherPatch9: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Navigate to the next question page
      navigate("/get-other-patch-10");
    }
  };

  const handleBack = () => {
    navigate("/get-other-patch-8");
  };

  const options = ["EASY TO GET TO KNOW", "HARD TO GET TO KNOW"];

  return (
    <div className="get-other-patch9-template">
      {/* X button in top left */}
      <button className="get-other-patch3-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="get-other-patch3-step-indicator">09</div>

      {/* Main question */}
      <div className="get-other-patch3-question">
        <div className="get-other-patch3-question-line">ARE YOU...</div>
      </div>

      {/* Image below title */}
      <img
        src="/n9.webp"
        alt="Character illustration"
        className="get-other-patch9-image"
      />

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

export default GetOtherPatch9;
