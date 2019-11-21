import i18next from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { renderChannel, renderChannelNews } from './renders';

i18next
  .use(Backend)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: `${__dirname}locales/{{lng}}/locale.json`,
    },
  });

export const renderInputForm = (state) => {
  const rssInput = document.getElementById('rssInput');
  const rssSubmitButton = document.getElementById('rssSubmitButton');
  rssInput.value = state.validationProcess.value;

  switch (state.validationProcess.state) {
    case 'invalid':
      rssSubmitButton.setAttribute('disabled', '');
      rssInput.classList.add('border-warning');
      break;
    case 'valid':
      rssSubmitButton.removeAttribute('disabled');
      rssInput.classList.remove('border-warning');
      break;
    default:
      break;
  }
};

export const addChannelHandler = (state, newvalue) => {
  const renderedChannel = renderChannel(newvalue);
  const feedField = document.getElementById('feedField');
  feedField.prepend(renderedChannel);
};

export const addNewsHandler = (state, newvalue) => {
  const newsContainer = document.getElementById(newvalue.parent);
  const newsField = newsContainer.querySelector('ul');
  const renderedNews = renderChannelNews(newvalue);
  newsField.prepend(renderedNews);
};

export const activateModalHandler = (state) => {
  const modalWindow = document.getElementById('modalWindow');
  const modalWindowLabel = modalWindow.querySelector('#modalWindowLabel');
  const modalWindowDescripiton = modalWindow.querySelector('#modalWindowDescripiton');

  switch (state.showNewsProcess.state) {
    case 'disabled':
      break;
    case 'enabled':
      modalWindowLabel.textContent = state.showNewsProcess.title;
      modalWindowDescripiton.textContent = state.showNewsProcess.description;
      break;
    default:
      break;
  }
};

export const renderAlert = (error) => {
  const alert = document.getElementById('alert');
  alert.textContent = i18next.t(`errors.${error}`);

  alert.classList.add('show');
  setTimeout(() => {
    alert.classList.remove('show');
  }, 5000);
};
