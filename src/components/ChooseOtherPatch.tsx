import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChooseOtherPatch: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPatches, setSelectedPatches] = useState<number[]>([]);

  const handlePatchClick = (index: number) => {
    setSelectedPatches((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleDone = () => {
    // Navigate to the next page or process the selection
    navigate("/personality-result");
  };

  const handleBack = () => {
    navigate("/get-other-patch-20");
  };

  // Create a 5x5 grid (25 total patches)
  const gridItems = Array.from({ length: 25 }, (_, index) => index);

  return (
    <div className="choose-other-patch-template">
      {/* X button in top left */}
      <button className="choose-other-patch-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Title */}
      <div className="choose-other-patch-title">CHOOSE YOUR OTHER PATCH</div>

      {/* Grid container */}
      <div className="choose-other-patch-grid-container">
        <div className="choose-other-patch-grid">
          {gridItems.map((index) => (
            <div
              key={index}
              className={`choose-other-patch-grid-item ${
                selectedPatches.includes(index) ? "selected" : ""
              }`}
              onClick={() => handlePatchClick(index)}
            >
              {/* Show marshmallow patch for first 5 items */}
              {index < 5 && (
                <div className="marshmallow-patch">
                  <div className="marshmallow-body"></div>
                  <div className="marshmallow-face">
                    <div className="marshmallow-eyes">
                      <div className="eye"></div>
                      <div className="eye"></div>
                    </div>
                    <div className="marshmallow-mouth"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* DONE button */}
      <button
        className="choose-other-patch-done-button"
        onClick={handleDone}
        disabled={selectedPatches.length === 0}
        style={{ opacity: selectedPatches.length === 0 ? 0.6 : 1 }}
      >
        DONE
      </button>
    </div>
  );
};

export default ChooseOtherPatch;
