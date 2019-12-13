/* eslint no-param-reassign: 0 */
import axios from 'axios';
import { differenceBy } from 'lodash';
import parseData from './parser';

export const getRssFeed = rssUrl => axios.get(`https://misty-bread-6389.jlarkov.workers.dev/?${rssUrl}`)
  .then(response => response.data);

export const updateRssFeed = (state, url, updateInterval) => {
  setTimeout(() => {
    getRssFeed(url).then((data) => {
      const { news } = parseData(data);

      const newNews = differenceBy(news, state.news, a => `${a.title}${url}`);
      if (newNews.length === 0) {
        return;
      }
      newNews.reverse().forEach((item) => {
        const newsItem = { ...item, url };
        state.news.push(newsItem);
      });
    })
      .then(() => updateRssFeed(state, url, updateInterval))
      .catch(() => {
        state.errors.push('badNetwork');
        updateRssFeed(state, url, updateInterval);
      });
  }, updateInterval);
};
