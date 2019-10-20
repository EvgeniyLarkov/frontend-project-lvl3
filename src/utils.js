import axios from 'axios';

export const getRssFeed = rssUrl => axios.get(`https://misty-bread-6389.jlarkov.workers.dev/?${rssUrl}`)
  .then(response => response.data);

export const parseData = (data) => {
  const parser = new DOMParser();

  const feed = parser.parseFromString(data, 'application/xml');
  const channel = feed.querySelector('channel');
  const channelLink = channel.querySelector('link').textContent;
  const channelTitle = channel.querySelector('title').textContent;
  const channelDescription = channel.querySelector('description').textContent;
  const channelItems = channel.querySelectorAll('item');
  const channelNews = [...channelItems].map((item) => {
    const title = item.querySelector('title').textContent;
    const link = item.querySelector('link').textContent;
    const description = item.querySelector('description').textContent;

    return { title, link, description };
  });

  return {
    channelLink, channelDescription, channelNews, channelTitle,
  };
};
