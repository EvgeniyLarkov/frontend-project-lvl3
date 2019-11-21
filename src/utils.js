/* eslint no-param-reassign: 0 */
import axios from 'axios';
import { differenceBy } from 'lodash';
import parseData from './parser';

export const getRssFeed = rssUrl => axios.get(`https://misty-bread-6389.jlarkov.workers.dev/?${rssUrl}`)
  .then(response => response.data);

export const updateRssFeed = (state, url, updateInterval) => {
  setTimeout(() => {
    getRssFeed(url).then((data) => {
      const { channelNews } = parseData(data);
      const newNews = differenceBy(channelNews, state.news, a => `${a.title}${a.parent}`);
      if (newNews.length === 0) {
        return;
      }
      newNews.reverse().forEach(item => state.news.push(item));
    })
      .then(() => updateRssFeed(state, url, updateInterval))
      .catch(() => {
        state.errors.push('badNetwork');
        updateRssFeed(state, url, updateInterval);
      });
  }, updateInterval);
};
