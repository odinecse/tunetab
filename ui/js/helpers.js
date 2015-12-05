import dataStore from './dataStore';

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
    'clear chat: /clear'
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
