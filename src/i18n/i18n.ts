import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import pt from './locales/pt.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import it from './locales/it.json';
import zh from './locales/zh.json';
import ko from './locales/ko.json';
import ja from './locales/ja.json';

export type SupportedLanguage = 'en' | 'pt' | 'es' | 'fr' | 'it' | 'zh' | 'ko' | 'ja';

const resources = {
  en: { translation: en },
  pt: { translation: pt },
  es: { translation: es },
  fr: { translation: fr },
  it: { translation: it },
  zh: { translation: zh },
  ko: { translation: ko },
  ja: { translation: ja },
} as const;

// Get browser language or default to English
const getBrowserLanguage = (): SupportedLanguage => {
  try {
    const browserLang = navigator.language.split('-')[0] as SupportedLanguage;
    return Object.keys(resources).includes(browserLang) ? browserLang : 'en';
  } catch {
    return 'en';
  }
};

// Initialize i18n with error handling
try {
  i18n.use(initReactI18next).init({
    resources,
    lng: getBrowserLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false, // Disable suspense to prevent rendering issues
    },
    // Add error handling for missing translations
    saveMissing: true,
    missingKeyHandler: (_lng: string, _ns: string, key: string) => {
      console.warn(`Missing translation: ${key} for language: ${_lng}`);
    },
  });
} catch (error) {
  console.error('Failed to initialize i18n:', error);
  // Fallback to English if initialization fails
  i18n.use(initReactI18next).init({
    resources: { en: { translation: en } },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
}

export default i18n; 