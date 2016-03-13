import outgoingActions from './outgoingActions';
import dataStore from '../dataStore';
import {isUndefined} from '../helpers';
import {announce, helpMessage, usersMessage, mutedMessage} from '../staticMessages';

export default function messageActionParser(data) {
  const msg = data.msg;
  const skipRX = /^\/skip/i;
  const helpRX = /^\/help/i;
  const gitRX = /^\/git/i;
  const roomsRX = /^\/rooms/i;
  const usersRX = /^\/users/i;
  const muteRX = /^\/mute/i;
  const unmuteRX = /^\/unmute/i;
  const tweetRX = /^\/tweet/i;
  const clearRX = /^\/clear/i;
  const aliasRX = /^\/alias\s([^(\s|\b)]*)/i;
  const joinRX = /^\/join\s([^(\s|\b)]*)/i;
  const submitRX = /^\/submit\s([^(\b)]*)/i;
  const submitRX2 = /^\/s\s([^(\b)]*)/i;
  const searchRX = /^\/search\s([^(\b)]*)/i;
  const pickRX = /^\/pick\s(\d)/i;
  const undoRX = /^\/undo/i;
  const undoRX2 = /^\/u/i;
  const recRX = /^\/rec/i;
  const recRX2 = /^\/r/i;
  const youtubeRX = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

  let aliasMatch = msg.match(aliasRX);
  let joinMatch = msg.match(joinRX);
  let submitMatch = msg.match(submitRX) || msg.match(submitRX2);
  let searchMatch = msg.match(searchRX);
  let pickMatch = msg.match(pickRX);

  if(aliasMatch) {
    outgoingActions.updateAlias({alias: aliasMatch[1]});
    return false;
  }
  if(skipRX.test(msg)) {
    dataStore.setVideoTimeSilent({videoTime: 0});
    outgoingActions.skipVideo();
    return false;
  }
  if(roomsRX.test(msg)) {
    outgoingActions.rooms();
    return false;
  }
  if(joinMatch) {
    window.location = '/r/' + joinMatch[1];
    return false;
  }
  if(usersRX.test(msg)) {
    usersMessage(dataStore.getData());
    return false;
  }
  if(gitRX.test(msg)) {
    window.open('https://github.com/odinecse/tunetab');
    return false;
  }
  if(tweetRX.test(msg)) {
    let message = encodeURI('hanging out here');
    let url = `http://twitter.com/share?text=${message}&url=${encodeURI(window.location.href)}`;
    let params = 'width=400,height=550,toolbar=0,location=0,status=0';
    window.open(url, 'Tweet', params);
    return false;
  }

  if(muteRX.test(msg)) {
    let m = {muted: true};
    dataStore.setMuted(m);
    mutedMessage(m);
    return false;
  }
  if(unmuteRX.test(msg)) {
    let m = {muted: false};
    dataStore.setMuted(m);
    mutedMessage(m);
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
  if(undoRX.test(msg) || undoRX2.test(msg)) {
    outgoingActions.undoSubmit();
    return false;
  }
  if(recRX.test(msg) || recRX2.test(msg)) {
    let data = dataStore.getData();
    let videoId = '';
    if(data.videos.current !== null) {
      videoId = data.videos.current.id;
      outgoingActions.submitVideo({videoId: videoId, type: 'rec'});
    }
    return false;
  }
  if(submitMatch) {
    let videoMatch = submitMatch[1];
    let videoURLTest = videoMatch.match(youtubeRX);
    if(videoURLTest) {
      outgoingActions.submitVideo({videoId: videoURLTest[1], type: 'url'});
    } else {
      outgoingActions.submitVideo({search: videoMatch, type: 'search'});
    }
    return false;
  }
  if(searchMatch) {
    let match = searchMatch[1];
    outgoingActions.submitVideo({search: match, type: 'searchq'});
    return false;
  }
  if(pickMatch) {
    let pick = pickMatch[1];
    let data = dataStore.getData();
    if(data.searchResults.length === 0) {
      announce('nothing to pick, search first', 'error');
      return false;
    } else {
      let upcoming = data.searchResults[pick];
      if(isUndefined(upcoming)) {
        announce('something went wrong', 'error');
        return false;
      }
      outgoingActions.submitVideo({videoId: data.searchResults[pick].id, type: 'url'});
      return false;
    }

  }
  return true;
}
