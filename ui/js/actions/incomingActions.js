import {welcomeMessage} from '../staticMessages';
import dataStore from '../dataStore';
import notificationSound from '../../files/notification.mp3';
import {customMessage} from '../staticMessages';

var notification = new Audio(notificationSound);
var socket = window.io();

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
  if(!document.hasFocus()) {
    notification.play();
  }
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

socket.on('searchresults', function(data){
  console.log('SOCKET:SEARCHRESULTS', data);
  dataStore.searchResults(data.results);
  let formatted = data.results.map(function(r, i){
    var title = ' ' + i + ': ' + r.title.substring(0, 36).trim();
    if(r.title.length > 36) {
      title += '...';
    }
    return title;
  });
  formatted.push('', 'use /pick [number] to choose');
  customMessage(['SEARCH RESULTS:', '--------------'],
    formatted, 'notification');
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
