import React from "react";
import { useNavigate } from "react-router-dom";

const StartScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    console.log("Start button clicked!");
    navigate("/name");
  };

  console.log("StartScreen is rendering");

  return (
    <div className="image-screen" onClick={handleStart}>
      <div className="image-container">
        <img
          src="Copy of WEBSITE LSP (2).svg"
          alt="QUA BUDS Landing Page"
          className="landing-image"
          onClick={handleStart}
        />
      </div>
      <div className="tap-anywhere-text">TAP ANYWHERE</div>
    </div>
  );
};

export default StartScreen;
