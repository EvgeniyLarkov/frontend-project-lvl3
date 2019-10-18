import 'bootstrap/dist/css/bootstrap.min.css';
import { isURL } from 'validator';
import { watch } from 'melanke-watchjs';
import axios from 'axios';

const getRssFeed = (rssUrl) => {
  const parser = new DOMParser();
  return axios.get(`https://misty-bread-6389.jlarkov.workers.dev/?${rssUrl}`)
    .then(response => parser.parseFromString(response.data, 'application/xml'));
};

const main = () => {
  const state = {
    inputRss: {
      valid: false,
      value: '',
    },
    feedList: {},
  };

  const rssInput = document.querySelector('[aria-describedby=submit-rss-button]');
  const rssSubmitButton = document.getElementById('submit-rss-button');
  const feedField = document.getElementById('feedfield');

  rssInput.addEventListener('input', (element) => {
    const link = element.target.value;
    if (isURL(link) && !Object.keys(state.feedList).includes(link)) {
      state.inputRss.valid = true;
      state.inputRss.value = link;
    } else {
      state.inputRss.valid = false;
      state.inputRss.value = '';
    }
  });

  rssSubmitButton.addEventListener('click', () => {
    getRssFeed(state.inputRss.value).then((feed) => {
      const channel = feed.querySelector('channel');
      const channelLink = channel.querySelector('link').textContent;
      const channelDescription = channel.querySelector('description').textContent;
      const channelItems = channel.querySelectorAll('item');
      const channelNews = [...channelItems].map((item) => {
        const title = item.querySelector('title').textContent;
        const link = item.querySelector('link').textContent;
        return { title, link };
      });
      state.feedList = { ...state.feedList, [channelLink]: { channelDescription, channelNews } };
      state.inputRss.value = '';
    });
  });

  watch(state, 'inputRss', () => {
    if (!state.inputRss.valid) {
      rssSubmitButton.setAttribute('disabled', '');
      rssInput.classList.add('border-warning');
      return;
    }
    rssSubmitButton.removeAttribute('disabled');
    rssInput.classList.remove('border-warning');
  });

  watch(state, 'feedList', () => {
    feedField.innerHTML = '';
    Object.keys(state.feedList).forEach((key) => {
      const div = document.createElement('div');
      div.classList.add('jumbotron', 'col-md-3');

      const h2 = document.createElement('h3');
      h2.classList.add('diplay-3');
      h2.textContent = key;

      const hr = document.createElement('hr');
      hr.classList.add('my-3');

      const p = document.createElement('p');
      p.classList.add('lead');
      p.textContent = state.feedList[key].channelDescription;

      const ul = document.createElement('ul');

      state.feedList[key].channelNews.forEach((item) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = item.title;
        a.setAttribute('href', item.link);

        li.append(a);
        ul.append(li);
      });

      div.append(h2);
      div.append(p);
      div.append(hr);
      div.append(ul);

      feedField.append(div);
    });
  });
};

main();
