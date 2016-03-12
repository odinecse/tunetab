import dataStore from './dataStore';

export function announce(msg, type='help') {
  let m = {
    msg: msg,
    alias: '',
    type: type
  };
  dataStore.pushMessage(m);
}

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

export const WELCOME = [
  'share this url to invite your friends!',
  'it\'s like watching weird tv or something...',
  '',
]

export const COMMANDS = [
  'COMMANDS:',
  ' add video: /s [search|youtubeurl]',
  ' rec: /r',
  ' undo add or rec: /u',
  ' skip: /skip',
  ' mute/unmute: /mute|/unmute',
  ' change alias: /alias [alias]',
  ' users in room: /users',
  ' list of active rooms: /rooms',
  ' join/create room: /join [room name]',
  ' tweet current room: /tweet',
  ' clear chat: /clear',
  ' help: /help',
  ' tunetab github: /git',
  '',
  '',
];


export function welcomeMessage(data) {
  let emptyArr = [];
  let welcome = emptyArr.concat(WELCOME, COMMANDS, currentUsers(data), '');
  oldSchool(welcome);
}

export function helpMessage() {
  oldSchool(COMMANDS);
}

export function mutedMessage(data) {
  let msg = data.muted ? 'muting' : 'unmuting'
  announce(msg);
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
