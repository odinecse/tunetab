import dataStore from './dataStore';

var socket = window.io();

socket.on('welcome', function(data){
  console.log('SOCKET:WELCOME', data);
  dataStore.setAlias({alias: data.alias});
  dataStore.setVideos({videos: data.videos});
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

socket.on('videoSubmitted', function(data){
  console.log('SOCKET:VIDEOSUBMITTED', data);
  dataStore.setVideos(data);
});

/// what is this? fix this along with io side 
socket.on('skippingVideo', function(data){
  _data.userVoted = false;
  _data.videos.videoTime = 0; // ?
  _data.skipVotes = data.skipVotes;
  _data.skipping = true;
  socket.emit('playNextVideo', {videoId: _data.videos.current.id});
  dataStore.emit('change');
});
//ditto

socket.on('skipVoteChanged', function(data){
  console.log('SOCKET:SKIPVIDEOCHANGED', data);
  _data.skipVotes = data.skipVotes;
  dataStore.emit('change');
});

socket.on('firstVideo', function(data){
  console.log('SOCKET:FIRSTVIDEO', data);
  dataStore.setVideos(data);
});

socket.on('playVideo', function(data){
  console.log('SOCKET:PLAYVIDEO', data);
  dataStore.setVideos(data);
});