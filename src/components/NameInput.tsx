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

  // const handleBack = () => {
  //   navigate("/");
  // };

  return (
    <div className="name-input-page">
      {/* Main content container */}
      <div className="name-content-container">
        {/* HELLO text */}
        <div className="hello-text">HELLO</div>

        {/* Character from hello.webp */}
        <div className="hello-character">
          <img
            src="/hello.webp"
            alt="Hello Character"
            className="hello-character-img"
          />
        </div>

        {/* Name prompt text */}
        <div className="name-prompt">
          <div className="name-prompt-line">PLEASE ENTER YOUR</div>
          <div className="name-prompt-name">NAME:</div>
        </div>

        {/* Input field */}
        <div className="name-input-container">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder=""
            className="name-input-field"
            autoFocus
          />
        </div>
      </div>

      {/* NEXT button */}
      <button
        className="name-next-button"
        onClick={handleNext}
        disabled={!name.trim()}
        style={{ opacity: !name.trim() ? 0.6 : 1 }}
      >
        NEXT
      </button>
    </div>
  );
};

export default NameInput;
