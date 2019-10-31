import 'bootstrap/js/src/modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { watch } from 'melanke-watchjs';
import {
  addChannel, activateModalWindow, disableModalWindow, validateUserInput,
} from './controller';
import {
  inputFormHandler, addChannelHandler, activateModalHandler, alertHandler,
} from './view';

const main = () => {
  const state = {
    updateInterval: 10000,
    inputRss: {
      type: 'invalid',
      value: '',
    },
    feedList: {},
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
  const rssSubmitButton = document.getElementById('rssSubmitButton');
  const modalWindow = document.getElementById('modalWindow');
  const dismissModalButton = modalWindow.querySelector('[data-dismiss=modal]');
  const feedField = document.getElementById('feedField');

  rssInput.addEventListener('input', element => validateUserInput(state, element));
  rssSubmitButton.addEventListener('click', () => addChannel(state));
  feedField.addEventListener('click', element => activateModalWindow(state, element));
  dismissModalButton.addEventListener('click', () => disableModalWindow(state));

  watch(state, 'inputRss', () => inputFormHandler(state));
  watch(state, 'feedList', (prop, action, newvalue) => addChannelHandler(state, newvalue), 1, true);
  watch(state, 'modalWindow', () => activateModalHandler(state));
  watch(state, 'alert', () => alertHandler(state));
};

main();
