// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // Load translation using http -> see /public/locales
  // Learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // Detect user language
  // Learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // Init i18next
  // For all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en', // Use English if detected language is not available
    debug: true, // Set to false in production
    supportedLngs: ['en', 'ja'],
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
    backend: {
      // Path where resources get loaded from
      loadPath: '/locales/{{lng}}/translation.json',
    },
    detection: {
      // Order and from where user language should be detected
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      // Keys or params to lookup language from
      caches: ['localStorage', 'cookie'],
    }
  });

export default i18n;