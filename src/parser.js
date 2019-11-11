export default (data) => {
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
      parent: channelLink.textContent,
    };
  });

  return {
    channelLink: channelLink.textContent,
    channelDescription: channelDescription.textContent,
    channelNews,
    channelTitle: channelTitle.textContent,
  };
};
