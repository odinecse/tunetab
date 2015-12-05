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
  let msgs = [
    'submit video: /submit [youtube]',
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
