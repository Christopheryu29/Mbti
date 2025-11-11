import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LanguageSelector: React.FC = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const handleLanguageSelect = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
    navigate("/name");
  };

  return (
    <div className="language-selector-page">
      <div className="language-selector-container">
        <h1 className="language-selector-title">CHOOSE LANGUAGE</h1>

        <div className="language-buttons-container">
          <div className="language-button-wrapper">
            <div className="language-flag us-flag">
              <div className="flag-stripe flag-red"></div>
              <div className="flag-stripe flag-white"></div>
              <div className="flag-stripe flag-red"></div>
              <div className="flag-stripe flag-white"></div>
              <div className="flag-stripe flag-red"></div>
              <div className="flag-stripe flag-white"></div>
              <div className="flag-stripe flag-red"></div>
              <div className="flag-canton"></div>
            </div>
            <button
              className="language-button"
              onClick={() => handleLanguageSelect("en")}
            >
              English
            </button>
            <img
              src="/language.webp"
              alt="English Character"
              className="language-character language-character-left"
            />
          </div>

          <div className="language-button-wrapper">
            <div className="language-flag id-flag">
              <div className="flag-stripe flag-red-top"></div>
              <div className="flag-stripe flag-white-bottom"></div>
            </div>
            <button
              className="language-button"
              onClick={() => handleLanguageSelect("id")}
            >
              Indonesia
            </button>
            <img
              src="/language1.webp"
              alt="Indonesian Character"
              className="language-character language-character-right"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
