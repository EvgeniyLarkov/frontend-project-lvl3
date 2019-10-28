import 'bootstrap/js/src/modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { isURL } from 'validator';
import { watch } from 'melanke-watchjs';
import renderChannel, { renderChannelNews } from './renders';
import { getRssFeed, parseData } from './utils';

const main = () => {
  const state = {
    updateInterval: 10000,
    inputRss: {
      valid: 'invalid',
      value: '',
    },
    feedList: {},
    newsModal: {
      active: 'disabled',
      title: '',
      description: '',
    },
  };

  const rssInput = document.getElementById('rssInput');
  const rssSubmitButton = document.getElementById('submit-rss-button');
  const feedField = document.getElementById('feedfield');

  const updateRssFeed = (url) => {
    setTimeout(() => {
      getRssFeed(url).then((data) => {
        const { channelNews } = parseData(data);
        const currentNews = state.feedList[url].channelNews;
        channelNews.forEach((item) => {
          if (currentNews.some(element => item.title === element.title)) {
            return;
          }
          state.feedList[url].channelNews.push(item);
          console.log(state.feedList[url].channelNews);
        });
      }).then(() => updateRssFeed(url));
    }, state.updateInterval);
  };

  rssInput.addEventListener('input', (element) => {
    state.inputRss.value = element.target.value;
    const url = state.inputRss.value;
    if (isURL(url)) {
      state.inputRss.valid = 'valid';
    } else {
      state.inputRss.valid = 'invalid';
    }
  });

  rssSubmitButton.addEventListener('click', () => {
    const url = state.inputRss.value;
    console.log(Object.keys(state.inputRss), url);
    if (!Object.keys(state.feedList).includes(url)) {
      state.inputRss.value = url;
    } else {
      state.inputRss.value = '';
      state.inputRss.valid = 'repeat';
      return;
    }
    
    getRssFeed(url).then((data) => {
      const {
        channelDescription, channelNews, channelTitle, channelLink,
      } = parseData(data);
      state.feedList[url] = {
        channelTitle, channelDescription, channelNews, channelLink,
      };
      console.log(state.feedList[url]);
      updateRssFeed(url);
    });
    state.inputRss.value = '';
  });

  feedField.addEventListener('click', (element) => {
    if (!(element.target.dataset.target === '#newsModal')) {
      return;
    }
    state.newsModal.title = element.target.dataset.title;
    state.newsModal.description = element.target.dataset.description;
    state.newsModal.active = 'active';
  });

  const dismissModalButton = document.querySelector('[data-dismiss=modal]');

  dismissModalButton.addEventListener('click', () => {
    state.newsModal.active = 'disabled';
  });
  
  watch(state, 'inputRss', () => {
    const alert = document.getElementById('inputAlert');
    switch (state.inputRss.valid) {
      case 'invalid':
        rssSubmitButton.setAttribute('disabled', '');
        rssInput.classList.add('border-warning');
        break;
      case 'valid':
        rssSubmitButton.removeAttribute('disabled');
        rssInput.classList.remove('border-warning');
        break;
      case 'repeat':
        alert.classList.remove('fade');
        alert.classList.add('show');
        setTimeout(() => {
          alert.classList.remove('show');
          alert.classList.add('fade');
        }, 5000);
        break;
      default:
        break;
    }
  });

  watch(state, 'feedList', (prop, action, newvalue) => {
    const newChannel = newvalue.added[0];
    const renderedChannel = renderChannel(state.feedList[newChannel]);
    feedField.prepend(renderedChannel);

    const newsContainer = document.getElementById(state.feedList[newChannel].channelLink);
    const newsField = newsContainer.querySelector('ul');

    watch(state.feedList[newChannel], 'channelNews', (val1, val2, newNews) => {
      const renderedNews = renderChannelNews(newNews);
      newsField.prepend(renderedNews);
    });
  }, 1, true);
  
  watch(state.inputRss, 'value', () => {
    rssInput.value = state.inputRss.value;
  });
  
  watch(state, 'newsModal', () => {
    const modal = document.getElementById('newsModal');
    switch (state.newsModal.active) {
      case 'disabled':
        break;
      case 'active':
        modal.querySelector('#newsModalLabel').textContent = state.newsModal.title;
        modal.querySelector('#newsModalDescripiton').textContent = state.newsModal.description;
        break;
      default:
        break;
    }
  });
};

main();
