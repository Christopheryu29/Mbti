import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enCommon from "./locales/en/common.json";
import enQuestions from "./locales/en/questions.json";
import enResults from "./locales/en/results.json";

import idCommon from "./locales/id/common.json";
import idQuestions from "./locales/id/questions.json";
import idResults from "./locales/id/results.json";

const resources = {
  en: {
    common: enCommon,
    questions: enQuestions,
    results: enResults,
  },
  id: {
    common: idCommon,
    questions: idQuestions,
    results: idResults,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: process.env.NODE_ENV === "development",

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false,
    },

    defaultNS: "common",
    ns: ["common", "questions", "results"],
  });

export default i18n;
