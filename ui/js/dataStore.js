import {EventEmitter} from 'events';
import Cookies from 'js-cookie';
import {COOKIE_NAME} from './constants';

var socket = window.io();

var _data = {
  editAlias: false,
  alias: '',
  skipVotes: 0,
  skipThreshold: 1,
  skipAllowed: false,
  skipping: false,
  users: {},
  userCount: 0,
  userVoted: false,
  videos: {
    current: null,
    videoTime: 0,
    previous: [],
    upcoming: []
  },
  messages: []
};

function checkIfCanSkip(data) {
  if(data.videos.upcoming.length > 0) {
    data.skipAllowed = true;
  }
}

socket.on('welcome', function(data){
  console.log('SOCKET:WELCOME', data);
  dataStore.setAlias({alias: data.alias});
  dataStore.setVideos({videos: data.videos});
});

socket.on('usersInfo', function(data){
  console.log('SOCKET:USERSINFO', data);
  _data.users = data.users;
  _data.userCount = data.userCount;
  _data.skipVotes = data.skipVotes;
  _data.skipThreshold  = data.skipThreshold;
  dataStore.emit('change');
});

socket.on('message', function(data){
  console.log('SOCKET:MESSAGE', data);
  _data.messages.push({
    msg: data.msg,
    alias: data.alias,
    type: data.type
  });
  dataStore.emit('change');
});

socket.on('announcement', function(data){
  console.log('SOCKET:ANNOUNCEMENT', data);
  _data.messages.push({
    msg: data.msg,
    alias: 'room',
    type: 'announcement'
  });
  dataStore.emit('change');
});

socket.on('notification', function(data){
  console.log('SOCKET:NOTIFICATION', data);
  dataStore.addNotification(data);
});

socket.on('videoSubmitted', function(data){
  console.log('SOCKET:VIDEOSUBMITTED', data);
  dataStore.setVideos(data);
});

socket.on('skippingVideo', function(data){
  _data.userVoted = false;
  _data.videos.videoTime = 0; // ?
  _data.skipVotes = data.skipVotes;
  _data.skipping = true;
  socket.emit('playNextVideo', {videoId: _data.videos.current.id});
  dataStore.emit('change');
});

socket.on('skipVoteChanged', function(data){
  console.log('SOCKET:SKIPVIDEOCHANGED', data);
  _data.skipVotes = data.skipVotes;
  dataStore.emit('change');
});

socket.on('firstVideo', function(data){
  console.log('SOCKET:FIRSTVIDEO', data);
  dataStore.setVideos(data);
});

socket.on('playVideo', function(data){
  console.log('SOCKET:PLAYVIDEO', data);
  dataStore.setVideos(data);
});

var dataStore = Object.assign({}, EventEmitter.prototype, {
  addChangeListener(callback) {
    this.on('change', callback);
  },
  removeChangeListener(callback) {
    this.off('change', callback);
  },
  toggleEditAlias() {
    _data.editAlias = !_data.editAlias;
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
    _data.skipping = false;
    checkIfCanSkip(_data);
    dataStore.emit('change');
  },
  pingTime(data) {
    socket.emit('tick', {videoTime: data.videoTime.toFixed(0)});
  },
  emitSubmitVideo(data) {
    socket.emit('submitVideo', {video: data.video});
  },
  videoOver() {
    _data.userVoted = false;
    _data.videos.videoTime = 0;
    _data.skipVotes = 0;
    _data.skipping = true;
    socket.emit('playNextVideo', {videoId: _data.videos.current.id});
    dataStore.emit('change');
  },
  emitSkipVideo() {
    _data.userVoted = true;
    dataStore.emit('change');
    socket.emit('skipVideo');
  },
  emitMsg(data) {
    var msg = {alias: data.alias, msg: data.msg, type: data.type};
    socket.emit('message', msg);
  },
  addNotification(data) {
    _data.messages.push({
      msg: data.msg,
      alias: 'notification',
      type: 'notification'
    });

    dataStore.emit('change');
  },
  getData() {
    return _data;
  }
});

export default dataStore;