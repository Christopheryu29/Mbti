import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const SelectCapColor: React.FC = () => {
  const navigate = useNavigate();
  const { updateUserData } = useFlow();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const capColors = [
    { image: "/6-removebg-preview.png", label: "BLACK", value: "black" },
    { image: "/5-removebg-preview.png", label: "NAVY", value: "navy" },
    { image: "/8-removebg-preview.png", label: "WHITE", value: "white" },
    { image: "/7-removebg-preview.png", label: "BEIGE", value: "beige" },
  ];

  const handleNext = () => {
    if (selectedColor) {
      updateUserData({
        selectedItem: {
          type: "cap",
          color: selectedColor,
          price: 75, // Cap is 75k
        },
      });
      navigate("/payment");
    }
  };

  const handleBack = () => {
    navigate("/select-item");
  };

  return (
    <div className="select-cap-color-page">
      <button className="select-cap-color-back-button" onClick={handleBack}>
        ×
      </button>

      <div className="select-cap-color-title">
        <div className="select-cap-color-title-line">PICK YOUR</div>
        <div className="select-cap-color-title-line">COLOR</div>
      </div>

      <div className="select-cap-color-grid">
        {capColors.map((cap, index) => (
          <div
            key={index}
            className={`select-cap-color-item ${
              selectedColor === cap.value ? "selected" : ""
            }`}
            onClick={() => setSelectedColor(cap.value)}
          >
            <div className="select-cap-color-image-wrapper">
              <img src={cap.image} alt={cap.label} />
            </div>
            <div className="select-cap-color-label">{cap.label}</div>
          </div>
        ))}
      </div>

      <div className="select-cap-color-size-text">ONE SIZE FITS ALL</div>

      <button
        className="page20-next-button"
        onClick={handleNext}
        disabled={!selectedColor}
      >
        NEXT
      </button>
    </div>
  );
};

export default SelectCapColor;
