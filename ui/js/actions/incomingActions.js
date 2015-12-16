import {welcomeMessage} from '../staticMessages';
import dataStore from '../dataStore';
import notificationSound   from '../../files/notification.mp3';

var socket = window.io();
var notification = new Audio(notificationSound);

notification.autoplay = false;

socket.on('welcome', function(data){
  console.log('SOCKET:WELCOME', data);
  dataStore.setAlias({alias: data.alias});
  dataStore.setVideos({videos: data.videos});
  dataStore.setUsers({users: data.users, userCount: data.userCount});
  welcomeMessage({alias: data.alias, users: data.users});
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
  notification.pause();
  notification.currentTime = 0;
  notification.play();
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
    alias: '',
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
  dataStore.setSubmitted({submitted: true})
  window.setTimeout(() => {
    dataStore.setSubmitted({submitted: false});
  }, 500);
  dataStore.setVideos(data);
});

socket.on('playVideo', function(data){
  console.log('SOCKET:PLAYVIDEO', data);
  dataStore.setVideos(data);
});
