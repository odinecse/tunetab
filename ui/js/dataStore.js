import {EventEmitter} from 'events';
import Cookies from 'js-cookie';
import {COOKIE_NAME} from './constants';

var _data = {
  alias: '',
  users: {},
  userCount: 0,
  skipping: false,
  videos: {
    current: null,
    videoTime: 0,
    previous: [],
    upcoming: []
  },
  messages: []
};

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
    Cookies.set(COOKIE_NAME, data.alias, { expires: 666});
    dataStore.emit('change');
  },
  setSkipping(data) {
    _data.skipping = data.skipping;
    dataStore.emit('change');
  },
  setVideos(data) {
    _data.videos = data.videos;
    _data.skipping = false;
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
  getData() {
    return _data;
  }
});

export default dataStore;