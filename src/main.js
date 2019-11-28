import 'bootstrap/js/src/modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { watch } from 'melanke-watchjs';
import {
  addChannel, openModalWindow, closeModalWindow, validateInput,
} from './controller';
import {
  renderInputForm, addChannelHandler, addNewsHandler, openModalHandler, renderAlert,
} from './view';

export default () => {
  const updateInterval = 10000;
  const state = {
    validationProcess: {
      state: 'invalid',
      value: '',
    },
    registrationProcess: {
      state: 'filling',
    },
    showNewsProcess: {
      state: 'closed',
      title: '',
      description: '',
    },
    feeds: [],
    news: [],
    errors: [],
  };

  const rssInput = document.getElementById('rssInput');
  const rssInputForm = document.getElementById('rssInputForm');
  const modalWindow = document.getElementById('modalWindow');
  const dismissModalButton = modalWindow.querySelector('[data-dismiss=modal]');
  const feedField = document.getElementById('feedField');

  rssInput.addEventListener('input', event => validateInput(state, event));
  rssInputForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addChannel(state, updateInterval);
  });
  feedField.addEventListener('click', event => openModalWindow(state, event));
  dismissModalButton.addEventListener('click', () => closeModalWindow(state));

  watch(state, 'validationProcess', () => renderInputForm(state));
  watch(state, 'feeds', (prop, action, newValue) => addChannelHandler(state, newValue));
  watch(state, 'news', (prop, action, newValue) => addNewsHandler(state, newValue));
  watch(state, 'showNewsProcess', () => openModalHandler(state));
  watch(state, 'errors', (prop, action, newValue) => renderAlert(newValue));
};
