/* eslint no-param-reassign: 0 */
import { renderChannel, renderChannelNews } from './renders';

export const inputFormHandler = (state) => {
  const rssInput = document.getElementById('rssInput');
  const rssSubmitButton = document.getElementById('rssSubmitButton');
  rssInput.value = state.inputRss.value;

  switch (state.inputRss.type) {
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

  switch (state.modalWindow.type) {
    case 'disabled':
      break;
    case 'active':
      modalWindowLabel.textContent = state.modalWindow.title;
      modalWindowDescripiton.textContent = state.modalWindow.description;
      break;
    default:
      break;
  }
};

export const alertHandler = (state) => {
  const alert = document.getElementById('alert');

  switch (state.alert.type) {
    case 'notexist':
      alert.textContent = 'URL is invalid or do not exist';
      break;
    case 'repeat':
      alert.textContent = 'This channel is already added to feed';
      break;
    case 'badnetwork':
      alert.textContent = 'Unable to update RSS feed';
      break;
    default:
      break;
  }

  alert.classList.add('show');
  setTimeout(() => {
    alert.classList.remove('show');
  }, 5000);
};
