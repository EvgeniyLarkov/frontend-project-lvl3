/* eslint no-param-reassign: 0 */
import axios from 'axios';
import { isURL } from 'validator';
import parseData from './parser';

export const getRssFeed = rssUrl => axios.get(`https://misty-bread-6389.jlarkov.workers.dev/?${rssUrl}`)
  .then(response => response.data);

export const updateRssFeed = (state, url, updateInterval) => {
  setTimeout(() => {
    getRssFeed(url).then((data) => {
      const { channelNews } = parseData(data);
      channelNews.forEach((item) => {
        if (state.news.some(element => (item.parent === element.parent)
         && (item.title === element.title))) {
          return;
        }
        state.news.push(item);
      });
    })
      .then(() => updateRssFeed(state, url))
      .catch(() => {
        state.alert.type = 'badnetwork';
        updateRssFeed(state, url);
      });
  }, updateInterval);
};

export const isValid = (state, link) => !state.feeds.find(item => item.channelUrl === link)
  && isURL(link);
