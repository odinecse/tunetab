import dataStore from './dataStore';

var socket = window.io();

function messageActionParser(data) {
  const skipRX = /^\/skip/i;

  const aliasRX = /^\/submit\s([^(\s|\b)]*)/i;

  let match = data.msg.match(aliasRX);
  console.log(match);
     
  if(skipRX.test(data.msg)) {
    console.log('skip');
  }
  return true;
}

var actions = {
  updateAlias(data) {
    socket.emit('updateAlias', {alias: data.alias});
  },
  tick(data) {
    socket.emit('tick', {
      videoTime: data.videoTime.toFixed(0),
    });
  },
  submitVideo(data) {
    socket.emit('submitVideo', {video: data.video});
  },
  playNextVideo(data) {
    socket.emit('playNextVideo', {videoId: data.currentVideosId});  
  },
  skipVideo() {
    socket.emit('skipVideo');  
  },
  message(data) {
    let msg = {};
    if(messageActionParser(data)) {
      msg = {
        alias: data.alias, 
        msg: data.msg, 
        type: data.type
      };
      socket.emit('message', msg);
    }
  }
};

export default actions;


/*
if(video !== '') {
      video = video.match(youtubeRX);
      if(video) {
        dataStore.emitSubmitVideo({video: video[1]});
      } else {
        dataStore.addNotification({msg: ERRORS.VIDEO_SUBMIT});
      }
      this.setState({video: ''});
    } 

    */