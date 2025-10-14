import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GetOtherPatch: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Navigate to the next question page
      navigate("/get-other-patch-2");
    }
  };

  const handleBack = () => {
    navigate("/personality-result");
  };

  const options = [
    "join in the talk of the group",
    "talk individually with people you know well",
  ];

  return (
    <div className="get-other-patch-template">
      {/* X button in top left */}
      <button className="get-other-patch-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="get-other-patch-step-indicator">01</div>

      {/* Main question */}
      <div className="get-other-patch-question">
        <div className="get-other-patch-question-line">WHEN YOU ARE WITH A</div>
        <div className="get-other-patch-question-line">GROUP OF PEOPLE,</div>
        <div className="get-other-patch-question-line">WOULD YOU USUALLY</div>
        <div className="get-other-patch-question-line">RATHER...</div>
      </div>

      {/* Character image */}
      <div className="get-other-patch-character">
        <div className="party-blob">
          <div className="blob-eyes">
            <div className="eye left-eye">
              <div className="pupil"></div>
              <div className="highlight"></div>
            </div>
            <div className="eye right-eye">
              <div className="pupil"></div>
              <div className="highlight"></div>
            </div>
          </div>
          <div className="blob-mouth"></div>
          <div className="party-hat"></div>
          <div className="confetti-effects">
            <div className="confetti confetti-1"></div>
            <div className="confetti confetti-2"></div>
            <div className="confetti confetti-3"></div>
            <div className="confetti confetti-4"></div>
          </div>
        </div>
      </div>

      {/* Options container */}
      <div className="get-other-patch-options-container">
        {options.map((option, index) => (
          <div
            key={index}
            className={`get-other-patch-option-box ${
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
        className="get-other-patch-next-button"
        onClick={handleNext}
        disabled={!selectedOption}
        style={{ opacity: !selectedOption ? 0.6 : 1 }}
      >
        NEXT
      </button>
    </div>
  );
};

export default GetOtherPatch;
