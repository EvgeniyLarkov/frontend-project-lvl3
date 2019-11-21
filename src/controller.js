/* eslint no-param-reassign: 0 */
import { isURL } from 'validator';
import { getRssFeed, updateRssFeed } from './utils';
import parseData from './parser';

export const validateInput = (state, element) => {
  if (state.registrationProcess.state === 'processing') {
    return;
  }

  state.validationProcess.value = element.target.value;
  state.registrationProcess.state = 'filling';
  const link = state.validationProcess.value;

  if (state.feeds.find(item => item.channelUrl === link)) {
    state.validationProcess.state = 'invalid';
    state.errors.push('repeat');
    return;
  }
  if (!isURL(link)) {
    state.validationProcess.state = 'invalid';
    return;
  }
  state.validationProcess.state = 'valid';
};

export const addChannel = (state, updateInterval) => {
  if (state.validationProcess.state !== 'valid') {
    return;
  }
  state.registrationProcess.state = 'processing';
  const url = state.validationProcess.value;

  getRssFeed(url).then((data) => {
    const {
      channelDescription, channelNews, channelTitle, channelLink,
    } = parseData(data);
    state.feeds.push({
      channelTitle, channelDescription, channelLink, channelUrl: url,
    });
    channelNews.reverse().forEach(item => state.news.push(item));
    updateRssFeed(state, url, updateInterval);
  })
    .then(() => { state.registrationProcess.state = 'processed'; })
    .catch(() => {
      state.errors.push('notExist');
    });

  state.validationProcess.value = '';
};

export const activateModalWindow = (state, element) => {
  if (!(element.target.dataset.target === '#modalWindow')) {
    return;
  }
  state.showNewsProcess.title = element.target.dataset.title;
  state.showNewsProcess.description = element.target.dataset.description;
  state.showNewsProcess.state = 'enabled';
};

export const disableModalWindow = (state) => {
  state.showNewsProcess.type = 'disabled';
};
