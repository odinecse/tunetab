import {EventEmitter} from 'events';

var _data = {
  editAlias: false,
  alias: '',
  skipVotes: 0,
  skipThreshold: 1,
  users: {},
  userCount: 0,
  videos: {}
}

var dataStore = Object.assign({}, EventEmitter.prototype, {
  addChangeListener(callback) {
    this.on('change', callback);
  },
  removeChangeListener(callback) {
    this.off('change', callback);
  },
  setEditAlias(data) {
    _data.editAlias = data.editAlias;
    dataStore.emit('change');
  },
  setAlias(data) {
    _data.alias = data.alias;
    _data.editAlias = false;
    dataStore.emit('change');
  },
  setVideos(data) {
    _data.videos = data.videos;
    dataStore.emit('change');
  },
  setUsers(data) {
    _data.users = data.users;
    _data.userCount = data.userCount;
    _data.skipVotes = data.skipVotes;
    _data.skipThreshold  = data.skipThreshold;
    dataStore.emit('change');
  },
  getData() {
    return _data;
  }
});



module.exports = dataStore;