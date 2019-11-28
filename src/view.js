import { renderChannel, renderChannelNews } from './renders';
import i18n from './i18n';

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
      rssSubmitButton.setAttribute('disabled', '');
      rssInput.classList.add('border-warning');
      break;
  }
};

export const addChannelHandler = (state, newValue) => {
  const renderedChannel = renderChannel(newValue);
  const feedField = document.getElementById('feedField');
  feedField.prepend(renderedChannel);
};

export const addNewsHandler = (state, newValue) => {
  const newsContainer = document.getElementById(newValue.parent);
  const newsField = newsContainer.querySelector('ul');
  const renderedNews = renderChannelNews(newValue);
  newsField.prepend(renderedNews);
};

export const openModalHandler = (state) => {
  const modalWindow = document.getElementById('modalWindow');
  const modalWindowLabel = modalWindow.querySelector('#modalWindowLabel');
  const modalWindowDescripiton = modalWindow.querySelector('#modalWindowDescripiton');

  switch (state.showNewsProcess.state) {
    case 'closed':
      break;
    case 'open':
      modalWindowLabel.textContent = state.showNewsProcess.title;
      modalWindowDescripiton.textContent = state.showNewsProcess.description;
      break;
    default:
      modalWindowLabel.textContent = '';
      modalWindowDescripiton.textContent = '';
      break;
  }
};

export const renderAlert = (error) => {
  const alert = document.getElementById('alert');
  alert.textContent = i18n.t(`errors.${error}`);

  alert.classList.add('show');
  setTimeout(() => {
    alert.classList.remove('show');
  }, 5000);
};
