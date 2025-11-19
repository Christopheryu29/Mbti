import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SelectItem: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<
    "shirt" | "cap" | null
  >(null);

  const handleNext = () => {
    if (selectedCategory) {
      if (selectedCategory === "cap") {
        navigate("/select-cap-color");
      } else if (selectedCategory === "shirt") {
        navigate("/select-shirt-color");
      }
    }
  };

  const handleBack = () => {
    navigate("/personality-result");
  };

  const shirts = [
    "/1-removebg-preview.png",
    "/2-removebg-preview.png",
    "/3-removebg-preview.png",
    "/4-removebg-preview.png",
  ];

  const caps = [
    "/5-removebg-preview.png",
    "/6-removebg-preview.png",
    "/7-removebg-preview.png",
  ];

  return (
    <div className="select-item-page">
      {/* Shirt Section */}
      <div className="select-item-card select-item-card-shirt">
        <button className="select-item-back-button" onClick={handleBack}>
          ×
        </button>
        <button
          className={`select-item-category-button ${
            selectedCategory === "shirt" ? "selected" : ""
          }`}
          onClick={() => setSelectedCategory("shirt")}
        >
          SHIRT
        </button>
        <div className="select-item-products shirt-grid">
          {shirts.map((shirt, index) => (
            <div key={index} className="select-item-product">
              <img src={shirt} alt={`Shirt ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className="select-item-price">129K-139K</div>
      </div>

      {/* Instruction Text */}
      <div className="select-item-instruction">
        <div className="select-item-instruction-line">PICK YOUR</div>
        <div className="select-item-instruction-line">ITEM</div>
      </div>

      {/* Cap Section */}
      <div className="select-item-card select-item-card-cap">
        <div className="select-item-price cap-price">75K-80k</div>
        <div className="select-item-products cap-grid">
          {caps.map((cap, index) => (
            <div key={index} className="select-item-product cap-product">
              <img src={cap} alt={`Cap ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      <button
        className={`select-item-category-button select-item-category-button-cap ${
          selectedCategory === "cap" ? "selected" : ""
        }`}
        onClick={() => setSelectedCategory("cap")}
      >
        CAP
      </button>

      {/* Next Button */}
      <button
        className="page20-next-button"
        onClick={handleNext}
        disabled={!selectedCategory}
      >
        NEXT
      </button>
    </div>
  );
};

export default SelectItem;
