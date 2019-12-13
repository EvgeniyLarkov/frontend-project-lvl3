export default (data) => {
  const parser = new DOMParser();
  const feed = parser.parseFromString(data, 'application/xml');
  const channel = feed.querySelector('channel');
  const channelLink = channel.querySelector('link');
  const channelTitle = channel.querySelector('title');
  const channelDescription = channel.querySelector('description');
  const channelItems = channel.querySelectorAll('item');
  const news = [...channelItems].map((item) => {
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
    title: channelTitle.textContent,
    link: channelLink.textContent,
    description: channelDescription.textContent,
    news,
  };
};
