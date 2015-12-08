import dataStore from './dataStore';
import {THE_FACE2} from './constants';

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

export function helpMessage() {
  // set time out here to make it more obvious
  let msgs = [
    'submit video: /submit [search terms]',
    '------------: or ',
    'submit video: /submit [youtube url]',
    'change alias: /alias [alias]',
    'skip video: /skip',
    'clear chat: /clear',
    'share url to invite your frens!',
    THE_FACE2
  ];
  msgs.forEach((msg) => {
    let d = {
      msg: msg,
      alias: 'help',
      type: 'help'
    };
    dataStore.pushMessage(d);
  });
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