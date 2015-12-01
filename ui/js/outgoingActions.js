import dataStore from './dataStore';

var socket = window.io();

var actions = {
  updateAlias(data) {
    socket.emit('updateAlias', {alias: data.alias});
  }
  tick(data) {
    // check syntax
    // add alaias here
    socket.emit('tick', {
      videoTime: data.videoTime.toFixed(0),
      socketId: socket.id
      alias: data.alias
    });
  },
  submitVideo(data) {
    socket.emit('submitVideo', {video: data.video});
  },
  playNextVideo(data) {
    socket.emit('playNextVideo', {videoId: data.currentVideosId});  
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
