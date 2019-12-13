export const renderChannelNews = (data) => {
  const li = document.createElement('li');
  li.innerHTML = `
  <div class="w-75">
    <a href="${data.link}">${data.title}</a>
  </div>
  <button class="btn btn-outline-primary btn-sm w-20 ml-auto" data-toggle="modal" data-target="#modalWindow" 
    data-description="${data.description}" data-title="${data.title}">Show details</button>
  `;
  li.classList.add('list-group-item', 'd-flex', 'flex-row');

  return li;
};

export const renderChannel = (data) => {
  const div = document.createElement('div');
  div.classList.add('jumbotron', 'col-md-4');
  div.setAttribute('id', data.url);
  div.innerHTML = `
  <h3>${data.title}</h3>
  <p class="lead">${data.description}</p>
  <hr class="my-3">
  <ul class='list-group'></ul>
  `;

  return div;
};
