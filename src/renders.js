export const renderChannelNews = (data) => {
  const a = document.createElement('a');
  a.textContent = data.title;
  a.setAttribute('href', data.link);

  const aWrapper = document.createElement('div');
  aWrapper.classList.add('w-75');
  aWrapper.append(a);

  const button = document.createElement('button');
  button.classList.add('btn', 'btn-outline-primary', 'btn-sm', 'w-20', 'ml-auto');
  button.textContent = 'Show details';
  button.setAttribute('data-toggle', 'modal');
  button.setAttribute('data-target', '#modalWindow');
  button.setAttribute('data-description', data.description);
  button.setAttribute('data-title', data.title);

  const li = document.createElement('li');
  li.classList.add('list-group-item', 'd-flex', 'flex-row');
  li.append(aWrapper);
  li.append(button);

  return li;
};

export const renderChannel = (data) => {
  const div = document.createElement('div');
  div.classList.add('jumbotron', 'col-md-4');
  div.setAttribute('id', data.channelLink);

  const h3 = document.createElement('h3');
  h3.textContent = data.channelTitle;

  const hr = document.createElement('hr');
  hr.classList.add('my-3');

  const p = document.createElement('p');
  p.classList.add('lead');
  p.textContent = data.channelDescription;

  const ul = document.createElement('ul');
  ul.classList.add('list-group');
  data.channelNews.forEach(item => ul.append(renderChannelNews(item)));

  div.append(h3);
  div.append(p);
  div.append(hr);
  div.append(ul);

  return div;
};
