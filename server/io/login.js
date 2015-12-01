var isUndefined = require('../helpers').isUndefined;
var MESSAGES = require('../constants').MESSAGES;
var countUsers = require('../helpers').countUsers;

module.exports = function login(globalData, room) {
  return function(data) {
    room.user.alias = data.alias ? data.alias : room.user.alias;
    room.id = data.room;
    globalData.users[room.id] = globalData.users[room.id] || {};
    room.users = globalData.users[room.id];
    room.users[room.socket.id] = room.user;
    globalData.videos[room.id] = globalData.videos[room.id] || {};
    if(isUndefined(globalData.videos[room.id].current)) {
      globalData.videos[room.id].current = null;
      globalData.videos[room.id].videoTime = 0;
      globalData.videos[room.id].upcoming = [];
      globalData.videos[room.id].previous = [];
    }
    room.userCount = countUsers(room.users);
    room.videos = globalData.videos[room.id];
    room.socket.join(room.id);
    room.io.to(room.socket.id).emit('welcome',
      {
        alias: room.user.alias,
        videos: room.videos
      }
    );
    room.socket.broadcast.to(room.id).emit('announcement',
      {msg: MESSAGES.CONNECTED(room.user.alias)});
    room.io.to(room.id).emit('usersInfo',
      {
        users: room.users,
        userCount: room.userCount,
      }
    );

    console.log('LOGIN');
    console.log('USERSTORE:', globalData.users);
    console.log('VIDEOSTORE:', globalData.videos);
  }
}
