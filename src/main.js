import 'bootstrap/js/src/modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { watch } from 'melanke-watchjs';
import {
  addChannel, activateModalWindow, disableModalWindow, validateInput,
} from './controller';
import {
  renderInputForm, addChannelHandler, addNewsHandler, activateModalHandler, renderAlert,
} from './view';

export default () => {
  const updateInterval = 10000;
  const state = {
    validationProcess: {
      state: 'invalid',
      value: '',
    },
    registrationProcess: { // inputRss
      state: 'filling',
    },
    showNewsProcess: {
      state: 'disabled',
      title: '',
      description: '',
    },
    feeds: [],
    news: [],
    errors: [], // alert
  };

  const rssInput = document.getElementById('rssInput');
  const rssInputForm = document.getElementById('rssInputForm');
  const modalWindow = document.getElementById('modalWindow');
  const dismissModalButton = modalWindow.querySelector('[data-dismiss=modal]');
  const feedField = document.getElementById('feedField');

  rssInput.addEventListener('input', element => validateInput(state, element));
  rssInputForm.addEventListener('submit', (element) => {
    element.preventDefault();
    addChannel(state, updateInterval);
  });
  feedField.addEventListener('click', element => activateModalWindow(state, element));
  dismissModalButton.addEventListener('click', () => disableModalWindow(state));

  watch(state, 'validationProcess', () => renderInputForm(state));
  watch(state, 'feeds', (prop, action, newvalue) => addChannelHandler(state, newvalue));
  watch(state, 'news', (prop, action, newvalue) => addNewsHandler(state, newvalue));
  watch(state, 'showNewsProcess', () => activateModalHandler(state));
  watch(state, 'errors', (prop, action, newvalue) => renderAlert(newvalue));
};
