import i18next from 'i18next';
import languageDetector from 'i18next-browser-languagedetector';
import resources from '../locales';

i18next
  .use(languageDetector)
  .init({
    fallbackLng: 'en',
    resources,
  });

export default i18next;
