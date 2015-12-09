import {THE_FACE3} from './constants';
import dataStore from './dataStore';

export function oldSchool(arr, type='help') {
  let funkytime = function(i) {
    return i % 3 === 0 ? 120 : 30;
  }
  let timeout = {}
  let iterator = function (i) {
    let msg = {
      msg: arr[i],
      alias: '',
      type: type
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

export const HELP_MESSAGE = [
  'submit video: ',
  '---> /submit [search terms]',
  '---> or ',
  '---> /submit [youtube url]',
  ' ',
  'undo submit (if not already playing): ',
  '---> /undo',
  ' ',
  'get a recommendation (based of current video): ',
  '---> /recommend',
  ' ',
  'change alias: ',
  '---> /alias [alias]',
  ' ',
  'skip video: ',
  '---> /skip',
  ' ',
  'see list of users in room: ',
  '---> /users',
  ' ',
  'see this message again: ',
  '---> /help',
  ' ',
  'clear chat: ',
  '---> /clear',
  ' ',
  'share url to invite your frens!',
  THE_FACE3,
  ' ',
]

export const ABOUT_MESSAGE = [
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  '...created by Einars Odinecs',
  ' ',
  ' ',
  ' ',
  THE_FACE3,
  ' ',
  ' ',
  ' ',
  ' ',
]

export function welcomeMessage(data) {
  var emptyArr = [];
  var welcome = emptyArr.concat(HELP_MESSAGE, currentUsers(data), '')
  oldSchool(welcome);
}

export function helpMessage() {
  oldSchool(HELP_MESSAGE);
}

export function aboutMessage() {
  oldSchool(ABOUT_MESSAGE);
}

export function usersMessage(data) {
  oldSchool([' ', currentUsers(data), ' '], 'notification');
}

export function currentUsers(data) {
  let msg = 'currently in the room: ';
  for(let uId in data.users) {
    if(data.users[uId].alias === data.alias) {
      msg += 'YOU, ';
    } else {
      msg += data.alias + ', ';
    }
  }
  return msg.slice(0, -2);
}
