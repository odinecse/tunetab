var animal = require('node-animal');
var globalData = {};

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
    var room = {
      io: io,
      socket: socket,
      lastActive: new Date(),
      id: '',
      user: {
        alias: animal.rand() + randInt(1, 999),
        skip: false,
        lastSubmitted: []
      },
      userCount: 0,
      skipVotes: 0,
      skipThreshold: 1,
      users: {},
      videos: {}
    }
    var login = require('./login')(globalData, room);
    var rooms = require('./rooms')(globalData, room);
    var updateAlias = require('./updateAlias')(room);
    var message = require('./message')(room);
    var submitVideo = require('./submit/submitVideo')(room);
    var undoSubmit = require('./undoSubmit')(room);
    var playNextVideo = require('./playNextVideo')(room);
    var skipVideo = require('./skipVideo')(room);
    var tick = require('./tick')(room);
    var disconnect = require('./disconnect')(globalData, room);

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

