import dataStore from './dataStore';
import {HELP_MESSAGE, ABOUT_MESSAGE} from './constants';

export function isUndefined(value) {
  return typeof value === "undefined";
}

export function isEmpty(object) {
  for(var key in object) {
    if(object.hasOwnProperty(key)){
      return false;
    }
  }
  return true;
}

export function oldSchool(arr) {
  let funkytime = function(i) {
    return i % 3 === 0 ? 180 : 60;
  }
  let timeout = {}
  let iterator = function (i) {
    let msg = {
      msg: arr[i],
      alias: '',
      type: 'help'
    };
    if(arr.length < i + 1) {
      window.clearTimeout(timeout);
      return;
    }
    dataStore.pushMessage(msg);
    timeout = window.setTimeout(function () {
      iterator(++i);
    }, funkytime(i));
  };

  iterator(0);
}

export function helpMessage() {
  oldSchool(HELP_MESSAGE);
}

export function aboutMessage() {
  oldSchool(ABOUT_MESSAGE);
}

export function shouldPlaylistUpdate(currentPropsVideos, nextPropsVideos) {
  let oneVideo = currentPropsVideos.slice(0, 1)[0];
  let oneNextVideo = nextPropsVideos.slice(0, 1)[0];
  if(currentPropsVideos.length !== nextPropsVideos.length) {
    return true;
  }
  if(isUndefined(oneVideo)) {
    return true;
  }
  if(!isUndefined(oneVideo) && !isUndefined(oneNextVideo)) {
    if(oneVideo.id === oneNextVideo.id) {
      return false;
    }
  }
  return true;
}
