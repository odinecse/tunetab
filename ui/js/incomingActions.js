import {helpMessage} from './helpers';
import dataStore from './dataStore';

var socket = window.io();

socket.on('welcome', function(data){
  console.log('SOCKET:WELCOME', data);
  helpMessage();
  dataStore.setAlias({alias: data.alias});
  dataStore.setVideos({videos: data.videos});
});

socket.on('aliasUpdated', function(data){
  console.log('SOCKET:ALIASUPDATED', data);
  dataStore.setAlias({alias: data.alias});
});

socket.on('usersInfo', function(data){
  console.log('SOCKET:USERSINFO', data);
  dataStore.setUsers(data);
});

socket.on('message', function(data){
  console.log('SOCKET:MESSAGE', data);
  dataStore.pushMessage(data);
});

socket.on('announcement', function(data){
  console.log('SOCKET:ANNOUNCEMENT', data);
  let d = {
    msg: data.msg,
    alias: 'room',
    type: 'announcement'
  };
  dataStore.pushMessage(d);
});

socket.on('notification', function(data){
  console.log('SOCKET:NOTIFICATION', data);
  let d = {
    msg: data.msg,
    alias: 'notification',
    type: 'notification'
  };
  dataStore.pushMessage(d);
});

socket.on('error', function(data){
  console.log('SOCKET:ERROR', data);
  let d = {
    msg: data.msg,
    alias: 'error',
    type: 'error'
  };
  dataStore.pushMessage(d);
});

socket.on('videoSubmitted', function(data){
  console.log('SOCKET:VIDEOSUBMITTED', data);
  dataStore.setVideos(data);
});

socket.on('playVideo', function(data){
  console.log('SOCKET:PLAYVIDEO', data);
  dataStore.setVideos(data);
});
