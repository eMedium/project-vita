import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

// Inicjalizacja i18n
i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: 'en', // Domyślny język
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    backend: {
      loadPath: '/locales/{{lng}}.json' // Ścieżka do plików tłumaczeń
    }
  });

// Mapowanie klas czcionek w zależności od języka
const fontClassMap = {
  ar: 'font-arabic', // Arabic
  ko: 'font-korean', // Korean
  ja: 'font-japanese', // Japanese
  zh: 'font-chinese-simplified', // Simplified Chinese
  'zh-TW': 'font-chinese-traditional', // Traditional Chinese (Taiwan)
  'zh-HK': 'font-chinese-traditional', // Traditional Chinese (Hong Kong)
};

// Funkcja zwracająca klasę czcionki w zależności od języka
export const getFontClass = () => {
  const language = i18n.language as keyof typeof fontClassMap;
  return fontClassMap[language] || 'font-sans';
};


export default i18n;
