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

      {/* Character images */}
      <div className="get-other-patch3-characters">
        {/* Tiger character (left) */}
        <div className="tiger-character">
          <div className="tiger-blob">
            <div className="tiger-eyes">
              <div className="eye left-eye">
                <div className="pupil"></div>
                <div className="highlight"></div>
              </div>
              <div className="eye right-eye">
                <div className="pupil"></div>
                <div className="highlight"></div>
              </div>
            </div>
            <div className="tiger-eyebrows"></div>
            <div className="tiger-mouth"></div>
            <div className="tiger-costume">
              <div className="tiger-stripe stripe-1"></div>
              <div className="tiger-stripe stripe-2"></div>
              <div className="tiger-stripe stripe-3"></div>
            </div>
          </div>
        </div>

        {/* Elephant character (right) */}
        <div className="elephant-character">
          <div className="elephant-blob">
            <div className="elephant-eyes">
              <div className="eye left-eye">
                <div className="pupil"></div>
                <div className="highlight"></div>
              </div>
              <div className="eye right-eye">
                <div className="pupil"></div>
                <div className="highlight"></div>
              </div>
            </div>
            <div className="elephant-mouth"></div>
            <div className="elephant-cheeks"></div>
            <div className="elephant-costume">
              <div className="elephant-trunk"></div>
            </div>
            <div className="elephant-hands"></div>
          </div>
        </div>
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

export default GetOtherPatch3;
