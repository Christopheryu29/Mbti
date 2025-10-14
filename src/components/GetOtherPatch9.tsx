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

  const options = ["EASY TO GET<br/>TO KNOW", "HARD TO GET<br/>TO KNOW"];

  return (
    <div className="get-other-patch9-template">
      {/* X button in top left */}
      <button className="get-other-patch9-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="get-other-patch9-step-indicator">09</div>

      {/* Light grey content container */}
      <div className="get-other-patch9-content-container">
        {/* Main question */}
        <div className="get-other-patch9-question">
          <div className="get-other-patch9-question-line">ARE YOU...</div>
        </div>

        {/* White options container */}
        <div className="get-other-patch9-options-container">
          {options.map((option, index) => (
            <div
              key={index}
              className={`get-other-patch9-option-box ${
                selectedOption === option ? "selected" : ""
              }`}
              onClick={() => setSelectedOption(option)}
              dangerouslySetInnerHTML={{ __html: option }}
            ></div>
          ))}
        </div>
      </div>

      {/* NEXT button at bottom */}
      <button
        className="get-other-patch9-next-button"
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
