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

  const handleBack = () => {
    navigate("/phone");
  };

  return (
    <div className="image-screen">
      <div className="image-container">
        <img
          src="/Copy of WEBSITE LSP (2).jpg"
          alt="Address Input Page"
          className="landing-image"
        />

        {/* Overlay form on the image */}
        <div className="image-overlay">
          {/* Input box */}
          <div className="address-input-box">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              className="address-input"
              autoFocus
            />
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
      </div>
    </div>
  );
};

export default AddressInput;
