import 'bootstrap/js/src/modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { isURL } from 'validator';
import { watch } from 'melanke-watchjs';
import renderChannel from './renders';
import { getRssFeed, parseData } from './utils';

const main = () => {
  const state = {
    updateInterval: 100000,
    inputRss: {
      valid: false,
      value: '',
    },
    feedList: {},
    newsModal: {
      active: false,
      title: '',
      description: '',
    },
  };

  const rssInput = document.querySelector('[aria-describedby=submit-rss-button]');
  const rssSubmitButton = document.getElementById('submit-rss-button');
  const feedField = document.getElementById('feedfield');

  const updateRssFeed = (url) => {
    getRssFeed(url).then((data) => {
      const {
        channelLink, channelDescription, channelNews, channelTitle,
      } = parseData(data);
      state.feedList = {
        ...state.feedList,
        [channelLink]: { channelTitle, channelDescription, channelNews },
      };
      state.inputRss.value = '';
    });
    setTimeout(() => updateRssFeed(url), state.updateInterval);
  };

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
    updateRssFeed(state.inputRss.value);
  });

  feedField.addEventListener('click', (element) => {
    if (!(element.target.dataset.target === '#newsModal')) {
      return;
    }
    state.newsModal.title = element.target.dataset.title;
    state.newsModal.description = element.target.dataset.description;
    state.newsModal.active = true;
  });

  const dismissButton = document.querySelector('[data-dismiss=modal]');

  dismissButton.addEventListener('click', () => {
    state.newsModal.active = false;
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
      const div = renderChannel(state.feedList[key]);
      feedField.append(div);
    });
  });

  watch(state, 'newsModal', () => {
    const modal = document.getElementById('newsModal');
    if (!state.newsModal.active) {
      return;
    }
    modal.querySelector('#newsModalLabel').textContent = state.newsModal.title;
    modal.querySelector('#newsModalDescripiton').textContent = state.newsModal.description;
  });
};

main();
