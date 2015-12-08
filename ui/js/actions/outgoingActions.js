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
      socket.emit('submitVideo', {video: data.video, type: 'url'});
      window.ga('send', 'event', 'videoSubmit', 'url', ROOM_ID, data.video);
    } else if(data.type === 'search') {
      socket.emit('submitVideo', {search: data.search, type: 'search'});
      window.ga('send', 'event', 'videoSubmit', 'search', ROOM_ID, data.search);
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
      window.ga('send', 'event', 'message', ROOM_ID, data.alias, data.msg);
      socket.emit('message', msg);
    }
  }
};

export default actions;
