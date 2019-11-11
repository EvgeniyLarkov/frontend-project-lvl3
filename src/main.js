import 'bootstrap/js/src/modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { watch } from 'melanke-watchjs';
import {
  addChannel, activateModalWindow, disableModalWindow, validateUserInput,
} from './controller';
import {
  inputFormHandler, addChannelHandler, addNewsHandler, activateModalHandler, alertHandler,
} from './view';

export default () => {
  const updateInterval = 10000;
  const state = {
    inputRss: {
      type: 'invalid',
      value: '',
    },
    feeds: [],
    news: [],
    modalWindow: {
      type: 'disabled',
      title: '',
      description: '',
    },
    alert: {
      type: '',
    },
  };

  const rssInput = document.getElementById('rssInput');
  const rssInputForm = document.getElementById('rssInputForm');
  const modalWindow = document.getElementById('modalWindow');
  const dismissModalButton = modalWindow.querySelector('[data-dismiss=modal]');
  const feedField = document.getElementById('feedField');

  rssInput.addEventListener('input', element => validateUserInput(state, element));
  rssInputForm.addEventListener('submit', (element) => {
    element.preventDefault();
    addChannel(state, updateInterval);
  });
  feedField.addEventListener('click', element => activateModalWindow(state, element));
  dismissModalButton.addEventListener('click', () => disableModalWindow(state));

  watch(state, 'inputRss', () => inputFormHandler(state));
  watch(state, 'feeds', (prop, action, newvalue) => addChannelHandler(state, newvalue));
  watch(state, 'news', (prop, action, newvalue) => addNewsHandler(state, newvalue));
  watch(state, 'modalWindow', () => activateModalHandler(state));
  watch(state, 'alert', () => alertHandler(state));
};
