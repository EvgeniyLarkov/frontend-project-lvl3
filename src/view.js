import { watch } from 'melanke-watchjs';
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
  const newChannel = newvalue.added[0];
  const renderedChannel = renderChannel(state.feedList[newChannel]);
  const feedField = document.getElementById('feedField');
  feedField.prepend(renderedChannel);

  const newsContainer = document.getElementById(state.feedList[newChannel].channelLink);
  const newsField = newsContainer.querySelector('ul');

  watch(state.feedList[newChannel], 'channelNews', (val1, val2, newNews) => {
    const renderedNews = renderChannelNews(newNews);
    newsField.prepend(renderedNews);
  });
};

export const activateModalHandler = (state) => {
  const modalWindow = document.getElementById('modalWindow');

  switch (state.modalWindow.type) {
    case 'disabled':
      break;
    case 'active':
      modalWindow.querySelector('#modalWindowLabel').textContent = state.modalWindow.title;
      modalWindow.querySelector('#modalWindowDescripiton').textContent = state.modalWindow.description;
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
    alert.classList.add('fade');
  }, 5000);
};
