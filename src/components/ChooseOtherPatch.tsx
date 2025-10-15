import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const ChooseOtherPatch: React.FC = () => {
  const navigate = useNavigate();
  const { updateUserData } = useFlow();
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
    // Save selected patches to user data
    const selectedPatchImages = selectedPatches.map(
      (index) => `mbti${index + 1}.webp`
    );
    updateUserData({
      selectedOtherPatches: selectedPatchImages,
    });

    // Navigate to design shirt page
    navigate("/design-shirt");
  };

  const handleBack = () => {
    navigate("/get-other-patch-20");
  };

  // Create a 4x4 grid (16 total MBTI patches)
  const gridItems = Array.from({ length: 16 }, (_, index) => index);

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
              {/* Show MBTI patch images */}
              <img
                src={`/mbti${index + 1}.webp`}
                alt={`MBTI Patch ${index + 1}`}
                className="mbti-patch-img"
              />
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
