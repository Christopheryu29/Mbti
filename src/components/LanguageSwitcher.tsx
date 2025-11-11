import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher">
      <button
        onClick={() => changeLanguage("en")}
        className={`language-btn ${i18n.language === "en" ? "active" : ""}`}
      >
        English
      </button>
      <button
        onClick={() => changeLanguage("id")}
        className={`language-btn ${i18n.language === "id" ? "active" : ""}`}
      >
        Bahasa Indonesia
      </button>
    </div>
  );
};

export default LanguageSwitcher;
