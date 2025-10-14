import React from "react";
import { useNavigate } from "react-router-dom";

const MBTICheck: React.FC = () => {
  const navigate = useNavigate();

  const handleYes = () => {
    navigate("/mbti-input");
  };

  const handleNo = () => {
    navigate("/mbti-test");
  };

  const handleBack = () => {
    navigate("/address");
  };

  return (
    <div className="image-screen">
      <div className="image-container">
        <img src="/5.jpg" alt="MBTI Check Page" className="landing-image" />

        {/* Overlay buttons on the image */}
        <div className="image-overlay">
          {/* Button group */}
          <div className="mbti-button-group">
            <button className="mbti-no-button" onClick={handleNo}>
              NO
            </button>
            <button className="mbti-yes-button" onClick={handleYes}>
              YES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MBTICheck;
