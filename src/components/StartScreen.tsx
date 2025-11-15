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
    <div className="image-screen">
      <div className="image-container">
        <img
          src="Copy of WEBSITE LSP (1).svg"
          alt="QUA BUDS Landing Page"
          className="landing-image"
          onClick={handleStart}
        />
      </div>
    </div>
  );
};

export default StartScreen;
