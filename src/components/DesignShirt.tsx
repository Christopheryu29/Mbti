import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const DesignShirt: React.FC = () => {
  const navigate = useNavigate();
  const { updateUserData } = useFlow();
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [selectedPosition, setSelectedPosition] = useState<string>("");

  const handleNext = () => {
    if (
      selectedTemplate &&
      (selectedTemplate === "middle" || selectedPosition)
    ) {
      // Save shirt design data
      updateUserData({
        shirtDesign: {
          template: selectedTemplate,
          position: selectedPosition || undefined,
        },
      });

      // Navigate to payment page
      navigate("/payment");
    }
  };

  // const handleBack = () => {
  //   navigate("/personality-result");
  // };

  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template);
    if (template === "middle") {
      setSelectedPosition(""); // Clear position for middle template
    }
  };

  const handlePositionSelect = (position: string) => {
    setSelectedPosition(position);
  };

  return (
    <div className="design-shirt-template">
      {/* Header */}
      <div className="design-header">
        <div className="design-subtitle">DESIGN YOUR SHIRT</div>
        <div className="design-title">CHOOSE TEMPLATE</div>
      </div>

      {/* Shirt Templates */}
      <div className="shirt-templates">
        {/* Top Row */}
        <div className="template-row">
          {/* Middle Template */}
          <div className="template-option">
            <div
              className={`shirt-template ${
                selectedTemplate === "middle" ? "selected" : ""
              }`}
              onClick={() => handleTemplateSelect("middle")}
            >
              <div className="shirt-body">
                <div className="shirt-collar"></div>
                <div className="shirt-sleeves">
                  <div className="sleeve left-sleeve"></div>
                  <div className="sleeve right-sleeve"></div>
                </div>
                <div className="shirt-hem"></div>
                <div className="patch-placeholder middle-patch">
                  <div className="patch-text">PATCH HERE</div>
                </div>
              </div>
            </div>
            <div className="template-label">MIDDLE</div>
          </div>

          {/* Chest Template */}
          <div className="template-option">
            <div
              className={`shirt-template ${
                selectedTemplate === "chest" ? "selected" : ""
              }`}
              onClick={() => handleTemplateSelect("chest")}
            >
              <div className="shirt-body">
                <div className="shirt-collar"></div>
                <div className="shirt-sleeves">
                  <div className="sleeve left-sleeve"></div>
                  <div className="sleeve right-sleeve"></div>
                </div>
                <div className="shirt-hem"></div>
                <div className="patch-placeholder chest-patch">
                  <div className="patch-text">PATCH HERE</div>
                </div>
              </div>
            </div>
            <div className="template-label">LEFT</div>
            <div className="position-buttons">
              <button
                className={`position-button ${
                  selectedTemplate === "chest" && selectedPosition === "left"
                    ? "selected"
                    : ""
                }`}
                onClick={() => handlePositionSelect("left")}
              >
                LEFT
              </button>
              <button
                className={`position-button ${
                  selectedTemplate === "chest" && selectedPosition === "right"
                    ? "selected"
                    : ""
                }`}
                onClick={() => handlePositionSelect("right")}
              >
                RIGHT
              </button>
            </div>
            <div className="choose-text">*CHOOSE*</div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="template-row">
          {/* Sleeve Template */}
          <div className="template-option sleeve-template">
            <div
              className={`shirt-template ${
                selectedTemplate === "sleeve" ? "selected" : ""
              }`}
              onClick={() => handleTemplateSelect("sleeve")}
            >
              <div className="shirt-body">
                <div className="shirt-collar"></div>
                <div className="shirt-sleeves">
                  <div className="sleeve left-sleeve"></div>
                  <div className="sleeve right-sleeve"></div>
                </div>
                <div className="shirt-hem"></div>
                <div className="patch-placeholder sleeve-patch">
                  <div className="patch-text">PATCH HERE</div>
                </div>
              </div>
            </div>
            <div className="template-label">SLEEVE</div>
            <div className="position-buttons">
              <button
                className={`position-button ${
                  selectedTemplate === "sleeve" && selectedPosition === "left"
                    ? "selected"
                    : ""
                }`}
                onClick={() => handlePositionSelect("left")}
              >
                LEFT
              </button>
              <button
                className={`position-button ${
                  selectedTemplate === "sleeve" && selectedPosition === "right"
                    ? "selected"
                    : ""
                }`}
                onClick={() => handlePositionSelect("right")}
              >
                RIGHT
              </button>
            </div>
            <div className="choose-text">*CHOOSE*</div>
          </div>
        </div>
      </div>

      {/* NEXT Button */}
      <button
        className="design-next-button"
        onClick={handleNext}
        disabled={
          !selectedTemplate ||
          (selectedTemplate !== "middle" && !selectedPosition)
        }
      >
        NEXT
      </button>
    </div>
  );
};

export default DesignShirt;
