import { isURL } from 'validator';
import { getRssFeed, parseData, updateRssFeed } from './utils';

export const addChannel = (state) => {
  const url = state.inputRss.value;

  if (!Object.keys(state.feedList).includes(url)) {
    state.inputRss.value = url;
  } else {
    state.inputRss.value = '';
    state.alert.type = 'repeat';
    return;
  }

  getRssFeed(url).then((data) => {
    const {
      channelDescription, channelNews, channelTitle, channelLink,
    } = parseData(data);
    state.feedList[url] = {
      channelTitle, channelDescription, channelNews, channelLink,
    };
    updateRssFeed(state, url);
  }).catch(() => {
    state.alert.type = 'notexist';
  });

  state.inputRss.value = '';
};

export const activateModalWindow = (state, element) => {
  if (!(element.target.dataset.target === '#modalWindow')) {
    return;
  }
  state.modalWindow.title = element.target.dataset.title;
  state.modalWindow.description = element.target.dataset.description;
  state.modalWindow.type = 'active';
};

export const disableModalWindow = (state) => {
  state.modalWindow.type = 'disabled';
};

export const validateUserInput = (state, element) => {
  state.inputRss.value = element.target.value;
  const url = state.inputRss.value;
  if (isURL(url)) {
    state.inputRss.type = 'valid';
  } else {
    state.inputRss.type = 'invalid';
  }
};
