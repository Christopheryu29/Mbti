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
    <div className="image-screen" style={{ background: "#f0f0f0", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="image-container" style={{ maxWidth: "480px", width: "100%" }}>
        <img
          src="/1.jpg"
          alt="QUA BUDS Landing Page"
          className="landing-image"
          onClick={handleStart}
          style={{ width: "100%", height: "auto", cursor: "pointer", borderRadius: "20px" }}
        />
      </div>
    </div>
  );
};

export default StartScreen;
