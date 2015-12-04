import dataStore from './dataStore';

var socket = window.io();

function messageActionParser(data) {
  const skipRX = /^\/skip/i;
  const aliasRX = /^\/alias\s([^(\s|\b)]*)/i;
  const submitRX = /^\/submit\s([^(\s|\b)]*)/i;
  const youtubeRX = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

  let aliasMatch = data.msg.match(aliasRX);
  let submitMatch = data.msg.match(submitRX);
  console.log(aliasMatch, submitMatch);
  
  if(submitMatch) {
    let videoURL = submitMatch[1];
    let videoTest = videoURL.match(youtubeRX);
    if(videoTest) {
      console.log('/submit', videoTest[1]);
      actions.submitVideo({video: videoTest[1]});
    } else {
      console.log('error submitting');
    }
    
    return false;
  } 
  if(aliasMatch) {
    console.log('/alias', aliasMatch[1]);
    actions.updateAlias({alias: aliasMatch[1]});
    return false;
  }
  if(skipRX.test(data.msg)) {
    console.log('/skip');
    actions.skipVideo();
    return false;
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