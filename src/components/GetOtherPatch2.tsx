import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GetOtherPatch2: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Navigate to the next question page
      navigate("/get-other-patch-3");
    }
  };

  const handleBack = () => {
    navigate("/get-other-patch");
  };

  const options = ["realistic people", "imaginative people"];

  return (
    <div className="get-other-patch2-template">
      {/* X button in top left */}
      <button className="get-other-patch3-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="get-other-patch3-step-indicator">02</div>

      {/* Main question */}
      <div className="get-other-patch3-question">
        <div className="get-other-patch3-question-line">DO YOU USUALLY</div>
        <div className="get-other-patch3-question-line">GET ALONG BETTER</div>
        <div className="get-other-patch3-question-line">WITH...</div>
      </div>

      {/* Character image */}
      <div className="get-other-patch2-character">
        <img
          src="/n2.webp"
          alt="Character"
          className="get-other-patch2-character-img"
        />
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
            {option.toUpperCase()}
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

export default GetOtherPatch2;
