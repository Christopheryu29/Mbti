import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GetOtherPatch6: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Navigate to the next question page
      navigate("/get-other-patch-7");
    }
  };

  const handleBack = () => {
    navigate("/get-other-patch-5");
  };

  const options = ["FACT COURSES", "COURSES INVOLVING THEORY"];

  return (
    <div className="get-other-patch6-template">
      {/* X button in top left */}
      <button className="get-other-patch3-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="get-other-patch3-step-indicator">06</div>

      {/* Main question */}
      <div className="get-other-patch3-question">
        <div className="get-other-patch3-question-line">
          IF YOU WERE A TEACHER,
        </div>
        <div className="get-other-patch3-question-line">
          WOULD YOU RATHER TEACH...
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
            {option}
          </div>
        ))}
      </div>

      {/* Character image */}
      <img src="/n6.webp" alt="Character" className="get-other-patch6-image" />

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

export default GetOtherPatch6;
