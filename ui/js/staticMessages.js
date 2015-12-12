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

export const BASIC_COMMANDS = [
  'submit video: ',
  '---> /submit [search terms]',
  '---> or ',
  '---> /submit [youtube url]',
  ' ',
  'get a recommendation: ',
  '---> /rec',
  ' (based off of current video)',
  ' ',
  'undo submit or recommendation: ',
  '---> /undo',
  ' (if not already playing)',
  ' ',
  'skip video: ',
  '---> /skip',
  ' (if no next video, same as /rec)',
  ' ',
];

export const LAST_MESSAGE = [
  'SEE ALL COMMANDS: ',
  '---> /help',
  ' ',
  'share url to invite your friends!',
  ' ',
  'make your own url:',
  '---> http://tunetab.us/r/myroom',
  ' (rooms is destroyed after all users leave)',
  ' ',
];

export const COMPLEX_COMMANDS = [
  'change alias: ',
  '---> /alias [alias]',
  ' ',
  'see list of users in room: ',
  '---> /users',
  ' ',
  'see list of active rooms: ',
  '---> /rooms',
  ' ',
  'clear chat: ',
  '---> /clear',
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
  var welcome = emptyArr.concat(BASIC_COMMANDS, LAST_MESSAGE, currentUsers(data), '');
  oldSchool(welcome);
}

export function helpMessage() {
  var emptyArr = [];
  var help = emptyArr.concat(BASIC_COMMANDS, COMPLEX_COMMANDS, LAST_MESSAGE);
  oldSchool(help);
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
      msg += data.users[uId].alias + ', ';
    }
  }
  return msg.slice(0, -2);
}
