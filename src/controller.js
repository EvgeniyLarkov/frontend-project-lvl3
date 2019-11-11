/* eslint no-param-reassign: 0 */
import { isURL } from 'validator';
import { getRssFeed, updateRssFeed, isValid } from './utils';
import parseData from './parser';

export const addChannel = (state, updateInterval) => {
  const url = state.inputRss.value;

  if (isValid(state, url)) {
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
    state.feeds.push({
      channelTitle, channelDescription, channelLink, channelUrl: url,
    });
    channelNews.forEach(item => state.news.push(item));
    updateRssFeed(state, url, updateInterval);
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
