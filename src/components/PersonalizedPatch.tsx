import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PERSONALIZED_QUESTIONS = [
  { id: 1, text: "What motivates you most in life?" },
  { id: 2, text: "How do you handle stress?" },
  { id: 3, text: "What's your ideal weekend?" },
  { id: 4, text: "How do you make decisions?" },
  { id: 5, text: "What energizes you?" },
  { id: 6, text: "How do you communicate?" },
  { id: 7, text: "What's your learning style?" },
  { id: 8, text: "How do you approach problems?" },
  { id: 9, text: "What's your work style?" },
  { id: 10, text: "How do you recharge?" },
  { id: 11, text: "What's your social preference?" },
  { id: 12, text: "How do you plan your time?" },
  { id: 13, text: "What's your conflict style?" },
  { id: 14, text: "How do you express creativity?" },
  { id: 15, text: "What's your risk tolerance?" },
  { id: 16, text: "How do you handle change?" },
  { id: 17, text: "What's your leadership style?" },
  { id: 18, text: "How do you show appreciation?" },
  { id: 19, text: "What's your communication preference?" },
  { id: 20, text: "How do you define success?" },
];

const PERSONALIZED_OPTIONS = [
  { color: "green", text: "Green - Analytical and systematic" },
  { color: "purple", text: "Purple - Creative and intuitive" },
  { color: "yellow", text: "Yellow - Social and energetic" },
  { color: "blue", text: "Blue - Calm and supportive" },
];

const PersonalizedPatch: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQuestion < PERSONALIZED_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // All questions answered, go to order flow
      navigate("/claim-order");
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    } else {
      navigate("/get-other-patch");
    }
  };

  return (
    <div className="screen">
      <div className="container">
        <div className="header">
          <button className="back-button" onClick={handleBack}>
            <ArrowLeft size={20} />
          </button>
          <h1>Personalized Assessment</h1>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${
                  ((currentQuestion + 1) / PERSONALIZED_QUESTIONS.length) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>

        <div className="content">
          <div className="question-card">
            <h2>
              Question {currentQuestion + 1} of {PERSONALIZED_QUESTIONS.length}
            </h2>
            <p>{PERSONALIZED_QUESTIONS[currentQuestion].text}</p>
            <div className="options">
              {PERSONALIZED_OPTIONS.map((option, index) => (
                <button
                  key={index}
                  className={`option-button ${option.color}`}
                  onClick={() => handleAnswer(index)}
                >
                  <span className="color-indicator"></span>
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedPatch;
