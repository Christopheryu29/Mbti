import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const PersonalityResult: React.FC = () => {
  const navigate = useNavigate();
  const { userData } = useFlow();
  const [hasSelectedAction, setHasSelectedAction] = useState(false);

  const personalityData = {
    green: {
      title: "THE HARMONIZER",
      description:
        "They lead with empathy and intuition, always seeking meaning and connection. They bring warmth and understanding wherever they go.",
    },
    purple: {
      title: "THE BRAINIACS",
      description:
        "They live in their heads analyzing, creating systems, and seeing patterns no one else notices. Logic is their playground.",
    },
    yellow: {
      title: "THE WANDERERS",
      description:
        "They live for the moment, embracing new experiences and spontaneity. Rules? Optional. Fun? Guaranteed.",
    },
    blue: {
      title: "THE GUARDIANS",
      description:
        "Grounded, dependable, and loyal they keep things running smoothly and make sure everyone's safe, steady, and supported.",
    },
  };

  const currentPersonality = userData.personalityType || "green";
  const data =
    personalityData[currentPersonality as keyof typeof personalityData];

  const handleClaimOrder = () => {
    setHasSelectedAction(true);
    navigate("/design-shirt");
  };

  const handleGetOtherPatch = () => {
    setHasSelectedAction(true);
    navigate("/get-other-patch");
  };

  return (
    <div className="personality-result-template">
      {/* Title */}
      <div className="result-title">YOU ARE...</div>

      {/* Character Image */}
      <div className="result-character">
        {currentPersonality === "yellow" && (
          <img
            src="/wanderers1.webp"
            alt="Wanderers Character"
            className="result-character-img"
          />
        )}
        {currentPersonality === "purple" && (
          <img
            src="/brainiacs.webp"
            alt="Brainiacs Character"
            className="result-character-img"
          />
        )}
        {currentPersonality === "blue" && (
          <img
            src="/guardians.webp"
            alt="Guardians Character"
            className="result-character-img"
          />
        )}
        {currentPersonality === "green" && (
          <img
            src="/harmonizer.webp"
            alt="Harmonizer Character"
            className="result-character-img"
          />
        )}
      </div>

      {/* Result Banner */}
      <div className="result-banner">
        <div className={`banner-text-small banner-text-${currentPersonality}`}>
          THE
        </div>
        <div className={`banner-text-large banner-text-${currentPersonality}`}>
          {data.title}
        </div>
      </div>

      {/* Description */}
      <div className="result-description">{data.description}</div>

      {/* Action Buttons */}
      <div className="result-actions">
        <button className="action-button-small" onClick={handleClaimOrder}>
          CLAIM & MAKE ORDER
        </button>
        <button className="action-button-small" onClick={handleGetOtherPatch}>
          GET YOUR OTHER PATCH
        </button>
      </div>

      {/* Helper Text */}
      {!hasSelectedAction && (
        <div className="result-helper-text">
          Please select an option above to continue
        </div>
      )}
    </div>
  );
};

export default PersonalityResult;
