# Internationalization (i18n) Setup Guide

## Overview

This document outlines the setup and implementation of internationalization (i18n) for the MBTI Project, supporting both English and Indonesian languages.

## Features

- **Supported Languages**: English (en) and Indonesian (id)
- **Language Detection**: Automatic detection based on browser settings
- **Manual Language Switching**: User can manually switch between languages
- **Persistent Language Selection**: Language preference is saved in localStorage
- **Fallback Support**: Falls back to English if translation is missing

## Installation

### Required Packages

```bash
npm install react-i18next i18next i18next-browser-languagedetector
```

### Optional Packages (for better development experience)

```bash
npm install --save-dev @types/react-i18next
```

## Project Structure

```
src/
├── i18n/
│   ├── index.ts                 # i18n configuration
│   ├── locales/
│   │   ├── en/
│   │   │   ├── common.json     # Common translations
│   │   │   ├── questions.json  # Question translations
│   │   │   └── results.json    # Result translations
│   │   └── id/
│   │       ├── common.json     # Indonesian translations
│   │       ├── questions.json  # Indonesian questions
│   │       └── results.json    # Indonesian results
│   └── resources.ts            # Translation resources
├── components/
│   ├── LanguageSwitcher.tsx   # Language switching component
│   └── ...                    # Other components
└── hooks/
    └── useTranslation.ts      # Custom translation hook
```

## Configuration

### i18n Configuration (`src/i18n/index.ts`)

```typescript
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
```

## Usage

### Basic Translation Hook

```typescript
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t("welcome")}</h1>
      <button onClick={() => i18n.changeLanguage("id")}>
        {t("switchToIndonesian")}
      </button>
    </div>
  );
}
```

### Namespace-specific Translation

```typescript
import { useTranslation } from "react-i18next";

function QuestionComponent() {
  const { t } = useTranslation("questions");

  return (
    <div>
      <h2>{t("question1.title")}</h2>
      <p>{t("question1.description")}</p>
    </div>
  );
}
```

### Language Switcher Component

```typescript
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
        className={i18n.language === "en" ? "active" : ""}
      >
        English
      </button>
      <button
        onClick={() => changeLanguage("id")}
        className={i18n.language === "id" ? "active" : ""}
      >
        Bahasa Indonesia
      </button>
    </div>
  );
};
```

## Translation Files Structure

### Common Translations (`common.json`)

```json
{
  "welcome": "Welcome",
  "next": "NEXT",
  "back": "BACK",
  "loading": "Loading...",
  "error": "An error occurred",
  "switchToIndonesian": "Switch to Indonesian",
  "switchToEnglish": "Switch to English"
}
```

### Question Translations (`questions.json`)

```json
{
  "question1": {
    "title": "When you are with a group of people, would you usually rather...",
    "options": {
      "option1": "Join in the talk of the group",
      "option2": "Talk individually with people you know well"
    }
  },
  "question2": {
    "title": "Do you usually get along better with...",
    "options": {
      "option1": "Realistic people",
      "option2": "Imaginative people"
    }
  }
}
```

## Implementation Steps

1. **Install Dependencies**

   ```bash
   npm install react-i18next i18next i18next-browser-languagedetector
   ```

2. **Create Directory Structure**

   ```bash
   mkdir -p src/i18n/locales/en
   mkdir -p src/i18n/locales/id
   ```

3. **Set up i18n Configuration**

   - Create `src/i18n/index.ts`
   - Configure language detection and fallbacks

4. **Create Translation Files**

   - Create JSON files for each language and namespace
   - Add translations for all text content

5. **Update Components**

   - Replace hardcoded strings with translation keys
   - Add language switcher component

6. **Initialize i18n in App**
   - Import i18n configuration in `main.tsx`
   - Add language switcher to layout

## Best Practices

1. **Translation Keys**: Use descriptive, hierarchical keys (e.g., `questions.question1.title`)
2. **Namespace Organization**: Group related translations by feature/page
3. **Fallback Handling**: Always provide English fallbacks
4. **Context Preservation**: Maintain context in translation keys
5. **Testing**: Test all languages during development
6. **Performance**: Use lazy loading for large translation files

## Testing

### Manual Testing

1. Test language switching functionality
2. Verify all text appears in selected language
3. Check fallback behavior for missing translations
4. Test language persistence across page reloads

### Automated Testing

```typescript
import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";

const renderWithI18n = (component: React.ReactElement) => {
  return render(<I18nextProvider i18n={i18n}>{component}</I18nextProvider>);
};
```

## Troubleshooting

### Common Issues

1. **Missing Translations**: Check console for missing key warnings
2. **Language Not Persisting**: Verify localStorage is enabled
3. **Fallback Not Working**: Check fallbackLng configuration
4. **Namespace Issues**: Ensure correct namespace usage in components

### Debug Mode

Enable debug mode in development:

```typescript
debug: process.env.NODE_ENV === "development";
```

## Maintenance

1. **Adding New Languages**: Extend resources object and create new locale directories
2. **Updating Translations**: Modify JSON files and test thoroughly
3. **Adding New Content**: Create new translation keys and update all language files
4. **Performance Monitoring**: Monitor bundle size impact of translation files

## Future Enhancements

1. **RTL Support**: Add right-to-left language support
2. **Pluralization**: Implement complex pluralization rules
3. **Date/Number Formatting**: Add locale-specific formatting
4. **Dynamic Loading**: Implement lazy loading for translation files
5. **Translation Management**: Integrate with translation management services
