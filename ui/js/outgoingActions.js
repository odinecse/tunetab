import dataStore from './dataStore';

var socket = window.io();

function messageActionParser(data) {
  const skipRX = /^\/skip/i;
  const helpRX = /^\/help/i;
  const aliasRX = /^\/alias\s([^(\s|\b)]*)/i;
  const submitRX = /^\/submit\s([^(\s|\b)]*)/i;
  const youtubeRX = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

  let aliasMatch = data.msg.match(aliasRX);
  let submitMatch = data.msg.match(submitRX);

  if(submitMatch) {
    let videoURL = submitMatch[1];
    let videoTest = videoURL.match(youtubeRX);
    let data = dataStore.getData();
    if(videoTest) {
      if(data.videos.current !== null && videoTest[1] === data.videos.current.id) {
        console.log('/submit error: can\'t submit save video twice');
        let d = {
          msg: 'can\'t submit same video twice',
          alias: 'notification',
          type: 'notification'
        };
        dataStore.pushMessage(d);
      } else {
        console.log('/submit', videoTest[1]);
        actions.submitVideo({video: videoTest[1]});
      }

    } else {
      console.log('/submit error');
      let d = {
        msg: 'error submitting',
        alias: 'notification',
        type: 'notification'
      };
      dataStore.pushMessage(d);
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
  if(helpRX.test(data.msg)) {
    console.log('/help');
    let msgs = [
      'submit video: /submit https://youtu.be/RH1ekuvSYzE',
      'change alias: /alias plumbus',
      'skip video: /skip'
    ];
    msgs.forEach((msg) => {
      let d = {
        msg: msg,
        alias: 'notification',
        type: 'notification'
      };
      dataStore.pushMessage(d);
    });
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
    dataStore.setSkipping({skipping: true});
    socket.emit('playNextVideo', {videoId: data.videoId});
  },
  skipVideo() {
    dataStore.setSkipping({skipping: true});
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
