import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const AddressInput: React.FC = () => {
  const navigate = useNavigate();
  const { userData, updateUserData } = useFlow();
  const [address, setAddress] = useState(userData.address);

  const handleNext = () => {
    if (address.trim()) {
      updateUserData({ address: address.trim() });
      navigate("/mbti-check");
    }
  };

  // const handleBack = () => {
  //   navigate("/phone");
  // };

  return (
    <div className="address-input-page">
      {/* Main content container */}
      <div className="address-content-container">
        {/* Character from address.webp */}
        <div className="address-character">
          <img
            src="/adress.webp"
            alt="Address Character"
            className="address-character-img"
          />
        </div>

        {/* Address prompt text */}
        <div className="address-prompt">
          <div className="address-prompt-line">PLEASE ENTER YOUR</div>
          <div className="address-prompt-address">ADDRESS:</div>
        </div>

        {/* Input field */}
        <div className="address-input-container">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder=""
            className="address-input-field"
            autoFocus
          />
        </div>
      </div>

      {/* NEXT button */}
      <button
        className="address-next-button"
        onClick={handleNext}
        disabled={!address.trim()}
        style={{ opacity: !address.trim() ? 0.6 : 1 }}
      >
        NEXT
      </button>
    </div>
  );
};

export default AddressInput;
