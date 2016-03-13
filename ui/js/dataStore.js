import {EventEmitter} from 'events';
import Cookies from 'js-cookie';
import {COOKIE_NAME} from './constants';

var _data = {
  alias: 'neo',
  users: {},
  userCount: 0,
  submitted: false,
  searchResults: [],
  muted: true,
  videos: {
    current: null,
    videoTime: 0,
    previous: [],
    upcoming: []
  },
  messages: []
};

function saveCookie() {
  let cookieData = {
    alias: _data.alias,
    muted: _data.muted
  }
  Cookies.set(COOKIE_NAME, JSON.stringify(cookieData), { expires: 666});
}

var dataStore = Object.assign({}, EventEmitter.prototype, {
  addChangeListener(callback) {
    this.on('change', callback);
  },
  removeChangeListener(callback) {
    this.off('change', callback);
  },
  setUsers(data) {
    _data.users = data.users;
    _data.userCount = data.userCount;
    dataStore.emit('change');
  },
  setAlias(data) {
    _data.alias = data.alias;
    saveCookie();
    dataStore.emit('change');
  },
  setVideos(data) {
    _data.videos = data.videos;
    dataStore.emit('change');
  },
  setVideoTimeSilent(data) {
    _data.videos.videoTime = data.videoTime;
  },
  setSubmitted(data) {
    _data.submitted = data.submitted;
    dataStore.emit('change');
  },
  setMuted(data) {
    _data.muted = data.muted;
    saveCookie();
    dataStore.emit('change');
  },
  pushMessage(data) {
    _data.messages.push({
      msg: data.msg,
      alias: data.alias,
      type: data.type
    });
    dataStore.emit('change');
  },
  searchResults(data) {
    _data.searchResults = data;
    dataStore.emit('change');
  },
  clearMessages() {
    _data.messages = [];
    dataStore.emit('change');
  },
  getData() {
    return _data;
  }
});

export default dataStore;
