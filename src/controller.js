/* eslint no-param-reassign: 0 */
import { isURL } from 'validator';
import { getRssFeed, updateRssFeed } from './utils';
import parseData from './parser';

export const validateInput = (state, event) => {
  if (state.registrationProcess.state === 'processing') {
    return;
  }

  state.validationProcess.value = event.target.value;
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
    const feed = parseData(data);
    const channel = feed.querySelector('channel');
    const channelLink = channel.querySelector('link');
    const channelTitle = channel.querySelector('title');
    const channelDescription = channel.querySelector('description');
    const channelItems = channel.querySelectorAll('item');
    const channelNews = [...channelItems].map((item) => {
      const title = item.querySelector('title');
      const link = item.querySelector('link');
      const description = item.querySelector('description');
      return {
        title: title.textContent,
        link: link.textContent,
        description: description.textContent,
        parent: channelLink.textContent,
      };
    });

    state.feeds.push({
      channelTitle: channelTitle.textContent,
      channelDescription: channelDescription.textContent,
      channelLink: channelLink.textContent,
      channelUrl: url,
    });
    channelNews.reverse().forEach(item => state.news.push(item));
    state.registrationProcess.state = 'processed';
    state.validationProcess.value = '';
    updateRssFeed(state, url, updateInterval);
  })
    .catch(() => {
      state.errors.push('notExist');
    });
};

export const openModalWindow = (state, event) => {
  if (!(event.target.dataset.target === '#modalWindow')) {
    return;
  }
  state.showNewsProcess.title = event.target.dataset.title;
  state.showNewsProcess.description = event.target.dataset.description;
  state.showNewsProcess.state = 'open';
};

export const closeModalWindow = (state) => {
  state.showNewsProcess.type = 'closed';
};
