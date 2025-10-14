import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const PhoneInput: React.FC = () => {
  const navigate = useNavigate();
  const { userData, updateUserData } = useFlow();
  const [phone, setPhone] = useState(userData.phone);

  const handleNext = () => {
    if (phone.trim()) {
      updateUserData({ phone: phone.trim() });
      navigate("/address");
    }
  };

  const handleBack = () => {
    navigate("/name");
  };

  return (
    <div className="image-screen">
      <div className="image-container">
        <img
          src="/WEBSITE LSP.jpg"
          alt="Phone Input Page"
          className="landing-image"
        />

        {/* Overlay form on the image */}
        <div className="image-overlay">
          {/* Input box */}
          <div className="phone-input-box">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="phone-input"
              autoFocus
            />
          </div>

          {/* NEXT button */}
          <button
            className="phone-next-button"
            onClick={handleNext}
            disabled={!phone.trim()}
            style={{ opacity: !phone.trim() ? 0.6 : 1 }}
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneInput;
