import React from "react";
import { useNavigate } from "react-router-dom";

const MBTITest: React.FC = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/page9");
  };

  return (
    <div className="image-screen">
      <div className="image-container">
        <img src="/8.jpg" alt="MBTI Test Page" className="landing-image" />

        {/* Overlay button on the image */}
        <div className="mbti-test-overlay">
          {/* NEXT button */}
          <button className="mbti-test-next-button" onClick={handleNext}>
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};

export default MBTITest;
