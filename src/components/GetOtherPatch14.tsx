import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GetOtherPatch14: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleNext = () => {
    if (selectedOption) {
      // Navigate to the next question page
      navigate("/get-other-patch-15");
    }
  };

  const handleBack = () => {
    navigate("/get-other-patch-13");
  };

  const options = [
    "HAS BOTH<br/>FEET ON THE<br/>GROUND",
    "IS ALWAYS<br/>COMING UP<br/>WITH NEW IDEAS",
  ];

  return (
    <div className="get-other-patch14-template">
      {/* X button in top left */}
      <button className="get-other-patch14-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Step indicator in top right */}
      <div className="get-other-patch14-step-indicator">14</div>

      {/* Light grey content container */}
      <div className="get-other-patch14-content-container">
        {/* Main question */}
        <div className="get-other-patch14-question">
          <div className="get-other-patch14-question-line">
            WOULD YOU RATHER
          </div>
          <div className="get-other-patch14-question-line">
            HAVE AS A FRIEND
          </div>
          <div className="get-other-patch14-question-line">SOMEONE WHO...</div>
        </div>

        {/* White options container */}
        <div className="get-other-patch14-options-container">
          {options.map((option, index) => (
            <div
              key={index}
              className={`get-other-patch14-option-box ${
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
        className="get-other-patch14-next-button"
        onClick={handleNext}
        disabled={!selectedOption}
        style={{ opacity: !selectedOption ? 0.6 : 1 }}
      >
        NEXT
      </button>
    </div>
  );
};

export default GetOtherPatch14;
