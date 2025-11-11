import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GetOtherPatch3: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Navigate to the next question page
      navigate("/get-other-patch-4");
    }
  };

  const handleBack = () => {
    navigate("/get-other-patch-2");
  };

  const options = ["analyze", "sympathize"];

  return (
    <div className="get-other-patch3-template">
      {/* X button in top left */}
      <button className="get-other-patch3-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="get-other-patch3-step-indicator">03</div>

      {/* Main question */}
      <div className="get-other-patch3-question">
        <div className="get-other-patch3-question-line">WHICH WORD IN THE</div>
        <div className="get-other-patch3-question-line">
          PAIR APPEALS TO YOU
        </div>
        <div className="get-other-patch3-question-line">MORE?</div>
      </div>

      {/* Options container */}
      <div className="get-other-patch3-options-container">
        {/* Top left image */}
        <img
          src="/n3.webp"
          alt="Character"
          className="get-other-patch3-image-top-left"
        />

        {/* Bottom right image */}
        <img
          src="/n3b.webp"
          alt="Character"
          className="get-other-patch3-image-bottom-right"
        />

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

export default GetOtherPatch3;
