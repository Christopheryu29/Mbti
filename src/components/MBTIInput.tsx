import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlow } from "../contexts/FlowContext";

const MBTIInput: React.FC = () => {
  const navigate = useNavigate();
  const { userData, updateUserData } = useFlow();
  const [mbti, setMbti] = useState(userData.mbti || "");

  // Function to map MBTI types to personality types
  const getPersonalityType = (mbtiType: string): string => {
    const mbti = mbtiType.toUpperCase();

    // Harmonizers (NF types) - Empathetic, intuitive, seeking meaning
    if (
      mbti.includes("NF") ||
      ["ENFJ", "ENFP", "INFJ", "INFP"].includes(mbti)
    ) {
      return "green";
    }

    // Brainiacs (NT types) - Analytical, logical, systems-oriented
    if (
      mbti.includes("NT") ||
      ["ENTJ", "ENTP", "INTJ", "INTP"].includes(mbti)
    ) {
      return "purple";
    }

    // Wanderers (SP types) - Spontaneous, experiential, fun-loving
    if (
      mbti.includes("SP") ||
      ["ESTP", "ESFP", "ISTP", "ISFP"].includes(mbti)
    ) {
      return "yellow";
    }

    // Guardians (SJ types) - Dependable, organized, loyal
    if (
      mbti.includes("SJ") ||
      ["ESTJ", "ESFJ", "ISTJ", "ISFJ"].includes(mbti)
    ) {
      return "blue";
    }

    // Default fallback based on individual letters
    if (mbti.includes("N") && mbti.includes("F")) return "green"; // NF
    if (mbti.includes("N") && mbti.includes("T")) return "purple"; // NT
    if (mbti.includes("S") && mbti.includes("P")) return "yellow"; // SP
    if (mbti.includes("S") && mbti.includes("J")) return "blue"; // SJ

    // Additional fallback based on dominant functions
    if (mbti.startsWith("E") && mbti.includes("P")) return "yellow"; // Extraverted Perceivers
    if (mbti.startsWith("I") && mbti.includes("J")) return "blue"; // Introverted Judgers
    if (mbti.includes("F")) return "green"; // Feelers
    if (mbti.includes("T")) return "purple"; // Thinkers

    // Final fallback
    return "green"; // Default to Harmonizer
  };

  const handleNext = () => {
    if (mbti.trim()) {
      const personalityType = getPersonalityType(mbti.trim());
      console.log(
        `MBTI: ${mbti.trim()} -> Personality Type: ${personalityType}`
      );
      updateUserData({
        mbti: mbti.trim(),
        personalityType: personalityType,
      });
      navigate("/personality-result");
    }
  };

  const handleForgot = () => {
    navigate("/mbti-test");
  };

  // const handleBack = () => {
  //   navigate("/mbti-check");
  // };

  return (
    <div className="image-screen">
      <div className="image-container">
        <img src="/6.jpg" alt="MBTI Input Page" className="landing-image" />

        {/* Overlay form on the image */}
        <div className="image-overlay">
          {/* Input box */}
          <div className="mbti-input-box">
            <input
              type="text"
              value={mbti}
              onChange={(e) => setMbti(e.target.value.toUpperCase())}
              placeholder="Enter your MBTI (e.g., INTJ)"
              className="mbti-input"
              maxLength={4}
              autoFocus
            />
          </div>

          {/* Button group */}
          <div className="mbti-input-button-group">
            <button className="mbti-forgot-button" onClick={handleForgot}>
              FORGOT
            </button>
            <button
              className="mbti-next-button"
              onClick={handleNext}
              disabled={!mbti.trim()}
              style={{ opacity: !mbti.trim() ? 0.6 : 1 }}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MBTIInput;
