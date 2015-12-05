import outgoingActions from './outgoingActions';
import dataStore from './dataStore';
import {helpMessage} from './helpers';
import {ERRORS} from './constants';

function validSubmitTest(currentVideo, videoId) {
  return currentVideo !== null && videoId === currentVideo.id;
}

function submit(video) {
  const data = dataStore.getData();
  if(video) {
    if(validSubmitTest(data.videos.current, video[1])) {
      let d = {
        msg: ERRORS.SUBMIT_DUPE,
        alias: 'notification',
        type: 'notification'
      };
      dataStore.pushMessage(d);
    } else {
      outgoingActions.submitVideo({video: video[1]});
    }
  } else {
    let d = {
      msg: ERRORS.SUBMIT_ERROR,
      alias: 'notification',
      type: 'notification'
    };
    dataStore.pushMessage(d);
  }
}

export default function messageActionParser(data) {
  const msg = data.msg;
  const skipRX = /^\/skip/i;
  const helpRX = /^\/help/i;
  const clearRX = /^\/clear/i;
  const aliasRX = /^\/alias\s([^(\s|\b)]*)/i;
  const submitRX = /^\/submit\s([^(\s|\b)]*)/i;
  const youtubeRX = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

  let aliasMatch = msg.match(aliasRX);
  let submitMatch = msg.match(submitRX);

  if(submitMatch) {
    let videoURL = submitMatch[1];
    let videoTest = videoURL.match(youtubeRX);
    submit(videoTest);
    return false;
  }
  if(aliasMatch) {
    outgoingActions.updateAlias({alias: aliasMatch[1]});
    return false;
  }
  if(skipRX.test(msg)) {
    outgoingActions.skipVideo();
    return false;
  }
  if(helpRX.test(msg)) {
    helpMessage();
    return false;
  }
  if(clearRX.test(msg)) {
    dataStore.clearMessages();
    return false;
  }
  return true;
}
