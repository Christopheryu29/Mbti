import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const MBTIInput: React.FC = () => {
  const navigate = useNavigate();
  const { userData, updateUserData } = useFlow();
  const [mbti, setMbti] = useState(userData.mbti || "");

  const handleNext = () => {
    if (mbti.trim()) {
      updateUserData({ mbti: mbti.trim() });
      navigate("/claim-order");
    }
  };

  const handleForgot = () => {
    navigate("/mbti-test");
  };

  // const handleBack = () => {
  //   navigate("/mbti-check");
  // };

  return (
    <div className="image-screen">
      <div className="image-container">
        <img src="/6.jpg" alt="MBTI Input Page" className="landing-image" />

        {/* Overlay form on the image */}
        <div className="image-overlay">
          {/* Input box */}
          <div className="mbti-input-box">
            <input
              type="text"
              value={mbti}
              onChange={(e) => setMbti(e.target.value.toUpperCase())}
              placeholder="Enter your MBTI (e.g., INTJ)"
              className="mbti-input"
              maxLength={4}
              autoFocus
            />
          </div>

          {/* Button group */}
          <div className="mbti-input-button-group">
            <button className="mbti-forgot-button" onClick={handleForgot}>
              FORGOT
            </button>
            <button
              className="mbti-next-button"
              onClick={handleNext}
              disabled={!mbti.trim()}
              style={{ opacity: !mbti.trim() ? 0.6 : 1 }}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MBTIInput;
