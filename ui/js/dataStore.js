import {EventEmitter} from 'events';
import Cookies from 'js-cookie';
import {COOKIE_NAME} from './constants';

var socket = window.io();

var _data = {
  editAlias: false,
  settingsDropdown: false,
  alias: '',
  skipVotes: 0,
  skipThreshold: 1,
  users: {},
  userCount: 0,
  videos: {},
  messages: [],
  notifications: []
};

socket.on('message', function(data){
  console.log('message', data);
  _data.messages.push({
    msg: data.msg,
    alias: data.alias,
    type: data.type
  });
  dataStore.emit('change');
});

socket.on('announcement', function(data){
  console.log('announcement', data);
  _data.messages.push({
    msg: data.msg,
    alias: 'room',
    type: 'announcement'
  });
  dataStore.emit('change');
});

socket.on('notification', function(data){
  console.log('pm', data);
  _data.notifications.push({
    msg: data.msg
  });
  dataStore.emit('change');
});

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
  setSettingsDropdown(data) {
    _data.settingsDropdown = data.settingsDropdown;
    dataStore.emit('change');
  },
  setAlias(data) {
    _data.alias = data.alias;
    Cookies.set(COOKIE_NAME, data.alias, { expires: 666});
    socket.emit('updateAlias', {alias: data.alias});
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
  sendMsg(data) {
    var msg = {alias: data.alias, msg: data.msg, type: data.type};
    socket.emit('message', msg);
  },
  getData() {
    return _data;
  }
});



export default dataStore;