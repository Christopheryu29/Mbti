import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GetOtherPatch5: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Navigate to the next question page
      navigate("/get-other-patch-6");
    }
  };

  const handleBack = () => {
    navigate("/get-other-patch-4");
  };

  const options = [
    "PLEASANT, OR AT LEAST EASY",
    "SOMETHING THAT TAKES A GOOD DEAL OF EFFORT",
  ];

  return (
    <div className="get-other-patch5-template">
      {/* X button in top left */}
      <button className="get-other-patch3-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="get-other-patch3-step-indicator">05</div>

      {/* Main question */}
      <div className="get-other-patch5-question">
        <div className="get-other-patch5-question-line">WHEN YOU HAVE TO</div>
        <div className="get-other-patch5-question-line">MEET STRANGERS,</div>
        <div className="get-other-patch5-question-line">DO YOU FIND IT...</div>
      </div>

      {/* Options container */}
      <div className="get-other-patch3-options-container">
        <img
          src="/n5.webp"
          alt="Character"
          className="get-other-patch5-image-top-right"
        />
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

export default GetOtherPatch5;
