import axios from 'axios';

export const getRssFeed = rssUrl => axios.get(`https://misty-bread-6389.jlarkov.workers.dev/?${rssUrl}`)
  .then(response => response.data);

export const parseData = (data) => {
  const parser = new DOMParser();

  const feed = parser.parseFromString(data, 'application/xml');
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
    };
  });

  return {
    channelLink: channelLink.textContent,
    channelDescription: channelDescription.textContent,
    channelNews,
    channelTitle: channelTitle.textContent,
  };
};


export const updateRssFeed = (state, url) => {
  setTimeout(() => {
    getRssFeed(url).then((data) => {
      const { channelNews } = parseData(data);
      const currentNews = state.feedList[url].channelNews;
      channelNews.forEach((item) => {
        if (currentNews.some(element => item.title === element.title)) {
          return;
        }
        state.feedList[url].channelNews.push(item);
      });
    })
      .then(() => updateRssFeed(state, url))
      .catch(() => {
        state.alert.type = 'badnetwork';
        updateRssFeed(state, url);
      });
  }, state.updateInterval);
};
