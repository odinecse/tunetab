import messageActionParser from './messageActionParser';
import {ROOM_ID} from '../constants';

var socket = window.io();

var actions = {
  updateAlias(data) {
    socket.emit('updateAlias', {alias: data.alias});
  },
  tick(data) {
    socket.emit('tick', {
      videoTime: data.videoTime.toFixed(0),
    });
  },
  submitVideo(data) {
    if(data.type === 'url') {
      socket.emit('submitVideo', {videoId: data.videoId, type: data.type});
      ga('send', 'event', 'videoSubmit:' + data.type, ROOM_ID, data.videoId);
    } else if(data.type === 'search') {
      socket.emit('submitVideo', {search: data.search, type: data.type});
      ga('send', 'event', 'videoSubmit:' + data.type, ROOM_ID, data.search);
    } else if(data.type === 'searchq') {
      socket.emit('submitVideo', {search: data.search, type: data.type});
      ga('send', 'event', 'videoSubmit:' + data.type, ROOM_ID, data.search);
    } else if(data.type === 'rec') {
      socket.emit('submitVideo', {videoId: data.videoId, type: data.type});
      ga('send', 'event', 'videoSubmit:' + data.type, ROOM_ID, data.videoId);
    }
  },
  undoSubmit() {
    socket.emit('undoSubmit');
  },
  rooms() {
    socket.emit('rooms');
  },
  playNextVideo(data) {
    socket.emit('playNextVideo', {videoId: data.videoId});
  },
  skipVideo() {
    socket.emit('skipVideo');
  },
  message(data) {
    let msg = {};
    if(messageActionParser(data)) {
      msg = {
        alias: data.alias,
        msg: data.msg,
        type: data.type
      };
      ga('send', 'event', 'message', ROOM_ID, data.alias + ': ' + data.msg);
      socket.emit('message', msg);
    }
  }
};

export default actions;
