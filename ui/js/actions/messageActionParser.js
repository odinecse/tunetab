import outgoingActions from './outgoingActions';
import dataStore from '../dataStore';
import {helpMessage, aboutMessage, usersMessage} from '../staticMessages';
import {ERRORS} from '../constants';

function validSubmitTest(currentVideo, videoId) {
  return currentVideo !== null && videoId === currentVideo.id;
}

function submitURL(video) {
  const data = dataStore.getData();
  if(validSubmitTest(data.videos.current, video[1])) {
    let d = {
      msg: ERRORS.SUBMIT_DUPE,
      alias: 'error',
      type: 'error'
    };
    dataStore.pushMessage(d);
  } else {
    outgoingActions.submitVideo({video: video[1], type: 'url'});
  }
}

function submitSearch(video) {
  outgoingActions.submitVideo({search: video, type: 'search'});
}

export default function messageActionParser(data) {
  const msg = data.msg;
  const skipRX = /^\/skip/i;
  const helpRX = /^\/help/i;
  const aboutRX = /^\/about/i;
  const recommendRX = /^\/recommend/i;
  const roomsRX = /^\/rooms/i;
  const usersRX = /^\/users/i;
  const clearRX = /^\/clear/i;
  const aliasRX = /^\/alias\s([^(\s|\b)]*)/i;
  const submitRX = /^\/submit\s([^(\b)]*)/i;
  const undoRX = /^\/undo/i;
  const youtubeRX = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

  let aliasMatch = msg.match(aliasRX);
  let submitMatch = msg.match(submitRX);

  if(submitMatch) {
    let videoMatch = submitMatch[1];
    let videoURLTest = videoMatch.match(youtubeRX);
    if(videoURLTest) {
      submitURL(videoURLTest)
    } else {
      submitSearch(videoMatch);
    }
    return false;
  }
  if(aliasMatch) {
    outgoingActions.updateAlias({alias: aliasMatch[1]});
    return false;
  }
  if(undoRX.test(msg)) {
    outgoingActions.undoSubmit();
    return false;
  }
  if(skipRX.test(msg)) {
    outgoingActions.skipVideo();
    return false;
  }
  if(roomsRX.test(msg)) {
    outgoingActions.rooms();
    return false;
  }
  if(usersRX.test(msg)) {
    usersMessage(dataStore.getData());
    return false;
  }
  if(aboutRX.test(msg)) {
    aboutMessage();
    return false;
  }
  if(recommendRX.test(msg)) {
    var data = dataStore.getData()
    var videoId = data.videos.current.id;
    outgoingActions.submitRelated({videoId: videoId});
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
