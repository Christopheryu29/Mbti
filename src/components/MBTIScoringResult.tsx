import React from "react";
import { useNavigate } from "react-router-dom";

export interface MBTIResult {
  type: string;
  scores: {
    E: number;
    I: number;
    S: number;
    N: number;
    T: number;
    F: number;
    J: number;
    P: number;
  };
}

interface MBTIScoringResultProps {
  result: MBTIResult;
}

const MBTIScoringResult: React.FC<MBTIScoringResultProps> = ({ result }) => {
  const navigate = useNavigate();

  const handleContinue = () => {
    // Navigate to the next page or back to personality result
    navigate("/personality-result");
  };

  const handleBack = () => {
    navigate("/choose-other-patch");
  };

  return (
    <div className="mbti-scoring-result-template">
      {/* X button in top left */}
      <button className="mbti-scoring-result-x-button" onClick={handleBack}>
        ×
      </button>

      {/* Title */}
      <div className="mbti-scoring-result-title">YOUR PERSONALITY TYPE</div>

      {/* Main result */}
      <div className="mbti-scoring-result-type">{result.type}</div>

      {/* Scoring table */}
      <div className="mbti-scoring-result-table-container">
        <table className="mbti-scoring-result-table">
          <thead>
            <tr>
              <th>Questions</th>
              <th>A</th>
              <th>B</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1, 5, 9, 13, 17</td>
              <td>E: {result.scores.E}</td>
              <td>I: {result.scores.I}</td>
            </tr>
            <tr>
              <td>2, 6, 10, 14, 18</td>
              <td>S: {result.scores.S}</td>
              <td>N: {result.scores.N}</td>
            </tr>
            <tr>
              <td>3, 7, 11, 15, 19</td>
              <td>T: {result.scores.T}</td>
              <td>F: {result.scores.F}</td>
            </tr>
            <tr>
              <td>4, 8, 12, 16, 20</td>
              <td>J: {result.scores.J}</td>
              <td>P: {result.scores.P}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Personality Type breakdown */}
      <div className="mbti-scoring-result-breakdown">
        <div className="mbti-scoring-result-breakdown-title">
          Personality Type
        </div>
        <div className="mbti-scoring-result-breakdown-items">
          <div className="breakdown-item">
            <span className="breakdown-letter">{result.type[0]}</span>
            <span className="breakdown-slash">/</span>
            <span className="breakdown-letter">
              {result.type[0] === "E" ? "I" : "E"}
            </span>
          </div>
          <div className="breakdown-item">
            <span className="breakdown-letter">{result.type[1]}</span>
            <span className="breakdown-slash">/</span>
            <span className="breakdown-letter">
              {result.type[1] === "S" ? "N" : "S"}
            </span>
          </div>
          <div className="breakdown-item">
            <span className="breakdown-letter">{result.type[2]}</span>
            <span className="breakdown-slash">/</span>
            <span className="breakdown-letter">
              {result.type[2] === "T" ? "F" : "T"}
            </span>
          </div>
          <div className="breakdown-item">
            <span className="breakdown-letter">{result.type[3]}</span>
            <span className="breakdown-slash">/</span>
            <span className="breakdown-letter">
              {result.type[3] === "J" ? "P" : "J"}
            </span>
          </div>
        </div>
      </div>

      {/* Continue button */}
      <button
        className="mbti-scoring-result-continue-button"
        onClick={handleContinue}
      >
        CONTINUE
      </button>
    </div>
  );
};

export default MBTIScoringResult;
