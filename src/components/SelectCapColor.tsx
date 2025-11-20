import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const SelectCapColor: React.FC = () => {
  const navigate = useNavigate();
  const { updateUserData } = useFlow();
  const [selectedHatType, setSelectedHatType] = useState<"hat" | "bucket_hat" | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Baseball caps (hat) - Column 1
  const hatColors = [
    { image: "/6-removebg-preview.png", label: "BLACK", value: "black" },
    { image: "/8-removebg-preview.png", label: "WHITE", value: "white" },
    { image: "/7-removebg-preview.png", label: "BEIGE", value: "beige" },
    { image: "/5-removebg-preview.png", label: "NAVY", value: "navy" },
  ];

  // Bucket hats - Column 2
  // Note: Update these image paths when bucket hat images are available
  const bucketHatColors = [
    { image: "/16-removebg-preview.png", label: "BLACK", value: "black" },
    { image: "/17-removebg-preview.png", label: "WHITE", value: "white" },
    { image: "/18-removebg-preview.png", label: "BEIGE", value: "beige" },
    { image: "/19-removebg-preview.png", label: "NAVY", value: "navy" },
  ];

  const handleItemClick = (hatType: "hat" | "bucket_hat", color: string) => {
    setSelectedHatType(hatType);
    setSelectedColor(color);
  };

  const handleNext = () => {
    if (selectedHatType && selectedColor) {
      updateUserData({
        selectedItem: {
          type: "cap",
          color: selectedColor,
          hatType: selectedHatType,
          price: 75, // Cap is 75k
        },
      });
      navigate("/add-on-patches");
    }
  };

  const handleBack = () => {
    navigate("/select-item");
  };

  const isSelected = (hatType: "hat" | "bucket_hat", color: string) => {
    return selectedHatType === hatType && selectedColor === color;
  };

  return (
    <div className="select-cap-color-page">
      <button className="select-cap-color-back-button" onClick={handleBack}>
        ×
      </button>

      <div className="select-cap-color-title">
        <div className="select-cap-color-title-line">PICK YOUR</div>
        <div className="select-cap-color-title-line">HAT</div>
      </div>

      <div className="select-cap-color-grid-two-columns">
        {/* Column 1: Baseball Caps (hat) */}
        <div className="select-cap-color-column">
          {hatColors.map((cap, index) => (
            <div
              key={`hat-${index}`}
              className={`select-cap-color-item ${
                isSelected("hat", cap.value) ? "selected" : ""
              }`}
              onClick={() => handleItemClick("hat", cap.value)}
            >
              <div className="select-cap-color-image-wrapper">
                <img src={cap.image} alt={cap.label} />
              </div>
              <div className="select-cap-color-label">{cap.label}</div>
            </div>
          ))}
        </div>

        {/* Column 2: Bucket Hats */}
        <div className="select-cap-color-column">
          {bucketHatColors.map((cap, index) => (
            <div
              key={`bucket_hat-${index}`}
              className={`select-cap-color-item ${
                isSelected("bucket_hat", cap.value) ? "selected" : ""
              }`}
              onClick={() => handleItemClick("bucket_hat", cap.value)}
            >
              <div className="select-cap-color-image-wrapper">
                <img src={cap.image} alt={cap.label} />
              </div>
              <div className="select-cap-color-label">{cap.label}</div>
            </div>
          ))}
        </div>
      </div>

      <button
        className="page20-next-button"
        onClick={handleNext}
        disabled={!selectedHatType || !selectedColor}
      >
        NEXT
      </button>
    </div>
  );
};

export default SelectCapColor;
