import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ComingSoon: React.FC = () => {
  const navigate = useNavigate();
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleBack = () => {
    navigate("/personality-result");
  };

  return (
    <div className="coming-soon-page">
      <button className="coming-soon-back-button" onClick={handleBack}>
        ×
      </button>
      
      <div className="coming-soon-content">
        <div className="coming-soon-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
        
        <div className="coming-soon-text-container">
          <h1 className="coming-soon-title">COMING SOON</h1>
          <p className="coming-soon-subtitle">
            We're working on something amazing{dots}
          </p>
          <div className="coming-soon-glow"></div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;

