import React from "react";
import { useNavigate } from "react-router-dom";

const Page3: React.FC = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/phone");
  };

  return (
    <div className="image-screen">
      <div className="image-container">
        <img
          src="/3.jpg"
          alt="Page 3"
          className="landing-image"
          onClick={handleNext}
        />
      </div>
    </div>
  );
};

export default Page3;
