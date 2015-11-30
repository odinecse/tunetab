import dataStore from './dataStore';

var socket = window.io();

var actions = {
  updateAlias(data) {
    socket.emit('updateAlias', {alias: data.alias});
  }
  tick(data) {
    socket.emit('tick', {videoTime: data.videoTime.toFixed(0)});
  },
  submitVideo(data) {
    socket.emit('submitVideo', {video: data.video});
  },
  playNextVideo(data) {
    socket.emit('playNextVideo', {videoId: _data.videos.current.id});  
  }
  skipVideo() {
    socket.emit('skipVideo');  
  }
  message(data) {
    var msg = {
      alias: data.alias, 
      msg: data.msg, 
      type: data.type
    };
    socket.emit('message', msg);
  }
};

export default actions;
