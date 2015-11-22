var animal = require('node-animal');
var globalData = {
  users: {},
  videos: {},
};

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = function(io) {
  return function(socket) {
    var socketData = {
      io: io,
      socket: socket,
      id: '',
      user: {
        alias: animal.rand() + randInt(1, 999),
        skip: false
      },
      userCount: 0,
      skipVotes: 0,
      skipThreshold: 1,
      users: {},
      videos: {}
    }
    var login = require('./login')(globalData, socketData);
    var submitVideo = require('./submitVideo')(socketData);
    var tick = require('./tick')(socketData);
    var playNextVideo = require('./playNextVideo')(socketData);
    var skipVideo = require('./skipVideo')(socketData);
    var message = require('./message')(socketData);
    var getVideoTime = require('./getVideoTime')(socketData);
    var updateAlias = require('./updateAlias')(socketData);
    var disconnect = require('./disconnect')(socketData);

    socket.on('login', login);
    socket.on('submitVideo', submitVideo);
    socket.on('tick', tick);
    socket.on('playNextVideo', playNextVideo);
    socket.on('skipVideo', skipVideo);
    socket.on('message', message);
    socket.on('getVideoTime', getVideoTime);
    socket.on('updateAlias', updateAlias);
    socket.on('disconnect', disconnect);

  }
}

