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
      navigate("/delivery-option");
    }
  };

  // const handleBack = () => {
  //   navigate("/name");
  // };

  return (
    <div className="phone-input-page">
      {/* Main content container */}
      <div className="phone-content-container">
        {/* Phone prompt text */}
        <div className="phone-prompt">
          <div className="phone-prompt-line">PLEASE ENTER YOUR</div>
          <div className="phone-prompt-phone">PHONE</div>
          <div className="phone-prompt-number">NUMBER :</div>
        </div>

        {/* Input field */}
        <div className="phone-input-container">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder=""
            className="phone-input-field"
            autoFocus
            inputMode="tel"
            autoComplete="tel"
            autoCapitalize="off"
            autoCorrect="off"
          />
        </div>

        {/* Character from phone.webp */}
        <div className="phone-character">
          <img
            src="/phone.webp"
            alt="Phone Character"
            className="phone-character-img"
          />
        </div>
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
  );
};

export default PhoneInput;
