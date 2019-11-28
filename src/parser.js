export default (data) => {
  const parser = new DOMParser();
  const feed = parser.parseFromString(data, 'application/xml');

  return feed;
};
