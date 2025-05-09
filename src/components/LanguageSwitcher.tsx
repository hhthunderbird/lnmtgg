import { useTranslation } from 'react-i18next';
import { SupportedLanguage } from '../i18n/i18n';

interface Language {
  code: SupportedLanguage;
  name: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'pt', name: 'Português' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'it', name: 'Italiano' },
  { code: 'zh', name: '中文' },
  { code: 'ko', name: '한국어' },
  { code: 'ja', name: '日本語' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string): void => {
    try {
      if (languages.some(lang => lang.code === lng)) {
        i18n.changeLanguage(lng).catch((error: Error) => {
          console.error('Failed to change language:', error);
          // Fallback to English if language change fails
          i18n.changeLanguage('en');
        });
      }
    } catch (error: unknown) {
      console.error('Error in language switcher:', error);
      // Fallback to English if any error occurs
      i18n.changeLanguage('en');
    }
  };

  // Get current language or fallback to English
  const currentLanguage = languages.some(lang => lang.code === i18n.language)
    ? i18n.language
    : 'en';

  return (
    <div className="flex items-center space-x-2">
      <select
        value={currentLanguage}
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 text-sm"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
} 