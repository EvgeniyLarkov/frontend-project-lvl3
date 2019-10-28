export const renderChannelNews = (item) => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  const button = document.createElement('button');

  a.textContent = item.title;
  a.setAttribute('href', item.link);

  button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  button.textContent = 'Show details';
  button.setAttribute('data-toggle', 'modal');
  button.setAttribute('data-target', '#newsModal');
  button.setAttribute('data-description', item.description);
  button.setAttribute('data-title', item.title);

  li.append(a);
  li.append(button);
  return li;
};

export default (data) => {
  const div = document.createElement('div');
  div.classList.add('jumbotron', 'col-md-3');
  div.setAttribute('id', data.channelLink);

  const h3 = document.createElement('h3');
  h3.textContent = data.channelTitle;

  const hr = document.createElement('hr');
  hr.classList.add('my-3');

  const p = document.createElement('p');
  p.classList.add('lead');
  p.textContent = data.channelDescription;

  const ul = document.createElement('ul');
  data.channelNews.forEach(item => ul.append(renderChannelNews(item)));

  div.append(h3);
  div.append(p);
  div.append(hr);
  div.append(ul);

  return div;
};
