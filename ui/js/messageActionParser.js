import outgoingActions from './outgoingActions';
import dataStore from './dataStore';
import {helpMessage} from './helpers';
import {ERRORS} from './constants';

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
  outgoingActions.submitVideo({search: video[1], type: 'search'});
}

export default function messageActionParser(data) {
  const msg = data.msg;

  // add about
  // add rooms list
  // add room join
  const skipRX = /^\/skip/i;
  const helpRX = /^\/help/i;
  const clearRX = /^\/clear/i;
  const aliasRX = /^\/alias\s([^(\s|\b)]*)/i;
  const submitRX = /^\/submit\s([^(\b)]*)/i;
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



// let d = {
//   msg: ERRORS.SUBMIT_ERROR,
//   alias: 'error',
//   type: 'error'
// };
// dataStore.pushMessage(d);