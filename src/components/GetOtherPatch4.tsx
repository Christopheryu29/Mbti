import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GetOtherPatch4: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Navigate to the next question page
      navigate("/get-other-patch-5");
    }
  };

  const handleBack = () => {
    navigate("/get-other-patch-3");
  };

  const options = ["APPEAL TO YOU", "CRAMP YOU"];

  return (
    <div className="get-other-patch4-template">
      {/* X button in top left */}
      <button className="get-other-patch4-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="get-other-patch4-step-indicator">04</div>

      {/* Main question */}
      <div className="get-other-patch4-question">
        <div className="get-other-patch4-question-left">DOES FOLLOWING</div>
        <div className="get-other-patch4-question-right">A SCHEDULE...</div>
        <img
          src="/n4.webp"
          alt="Character"
          className="get-other-patch4-image"
        />
      </div>

      {/* Options container */}
      <div className="get-other-patch4-options-container">
        {options.map((option, index) => (
          <div
            key={index}
            className={`get-other-patch4-option-box ${
              selectedOption === option ? "selected" : ""
            }`}
            onClick={() => setSelectedOption(option)}
          >
            {option.toUpperCase()}
          </div>
        ))}
      </div>

      {/* NEXT button at bottom */}
      <button
        className="get-other-patch4-next-button"
        onClick={handleNext}
        disabled={!selectedOption}
        style={{ opacity: !selectedOption ? 0.6 : 1 }}
      >
        NEXT
      </button>
    </div>
  );
};

export default GetOtherPatch4;
