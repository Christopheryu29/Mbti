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
      <button className="get-other-patch2-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="get-other-patch2-step-indicator">02</div>

      {/* Main question */}
      <div className="get-other-patch2-question">
        <div className="get-other-patch2-question-line">DO YOU USUALLY</div>
        <div className="get-other-patch2-question-line">GET ALONG BETTER</div>
        <div className="get-other-patch2-question-line">WITH...</div>
      </div>

      {/* Character image */}
      <div className="get-other-patch2-character">
        <div className="two-blobs">
          {/* Blue blob (sad/grumpy) */}
          <div className="blue-blob">
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
            <div className="blob-mouth sad"></div>
            <div className="blob-arm"></div>
          </div>

          {/* Yellow blob (happy) */}
          <div className="yellow-blob">
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
            <div className="blob-mouth happy"></div>
          </div>
        </div>
      </div>

      {/* Options container */}
      <div className="get-other-patch2-options-container">
        {options.map((option, index) => (
          <div
            key={index}
            className={`get-other-patch2-option-box ${
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
        className="get-other-patch2-next-button"
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
