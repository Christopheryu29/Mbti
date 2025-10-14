import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const NameInput: React.FC = () => {
  const navigate = useNavigate();
  const { userData, updateUserData } = useFlow();
  const [name, setName] = useState(userData.name);

  const handleNext = () => {
    if (name.trim()) {
      updateUserData({ name: name.trim() });
      navigate("/phone");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="image-screen">
      <div className="image-container">
        <img
          src="/Copy of WEBSITE LSP (1).jpg"
          alt="Name Input Page"
          className="landing-image"
        />

        {/* Overlay form on the image */}
        <div className="image-overlay">
          {/* Input box */}
          <div className="name-input-box">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="name-input"
              autoFocus
            />
          </div>

          {/* NEXT button */}
          <button
            className="next-button"
            onClick={handleNext}
            disabled={!name.trim()}
            style={{ opacity: !name.trim() ? 0.6 : 1 }}
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};

export default NameInput;
