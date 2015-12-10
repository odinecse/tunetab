var animal = require('node-animal');
var globalData = {
  users: {},
  videos: {},
};

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
  (created in login action)
  videos contains: {
    current: {videoObj};
    videoTime: 0;
    upcoming: [array of videoObjs];
    previous = [array of videoObj];
    history = [array of videoIds];
  }
  videoObj: {
    id: videoId,
    title: title,
    thumb: thumb,
    user: alias
  }
*/
module.exports = function(io) {
  return function(socket) {
    var socketData = {
      io: io,
      socket: socket,
      id: '',
      user: {
        alias: animal.rand() + randInt(1, 999),
        skip: false,
        lastSubmitted: null
      },
      userCount: 0,
      skipVotes: 0,
      skipThreshold: 1,
      users: {},
      videos: {}
    }
    var login = require('./login')(globalData, socketData);
    var rooms = require('./rooms')(globalData, socketData);
    var updateAlias = require('./updateAlias')(socketData);
    var message = require('./message')(socketData);
    var submitVideo = require('./submit/submitVideo')(socketData);
    var undoSubmit = require('./undoSubmit')(socketData);
    var playNextVideo = require('./playNextVideo')(socketData);
    var skipVideo = require('./skipVideo')(socketData);
    var tick = require('./tick')(socketData);
    var disconnect = require('./disconnect')(globalData, socketData);

    socket.on('login', login);
    socket.on('rooms', rooms);
    socket.on('updateAlias', updateAlias);
    socket.on('message', message);
    socket.on('submitVideo', submitVideo);
    socket.on('undoSubmit', undoSubmit);
    socket.on('playNextVideo', playNextVideo);
    socket.on('skipVideo', skipVideo);
    socket.on('tick', tick);
    socket.on('disconnect', disconnect);

  }
}

