var isUndefined = require('../helpers').isUndefined;
var MESSAGES = require('../constants').MESSAGES;
var countUsers = require('../helpers').countUsers;

module.exports = function login(globalData, room) {
  return function(data) {
    // on login either overwrites alias with cookie or uses preassigned alias
    room.user.alias = data.alias ? data.alias : room.user.alias;
    // room is passed from server [express router], to client, back to socket
    room.id = data.room;
    // if room exists in global data, instantate that
    globalData[room.id] = globalData[room.id] || {users: {}, videos: {}, inactive: false};
    // for ease of use
    room.users = globalData[room.id].users;
    // make a user in room
    room.users[room.socket.id] = room.user;
    // set up video variables if they dont exist
    if(isUndefined(globalData[room.id].videos.current)) {
      globalData[room.id].videos.current = null;
      globalData[room.id].videos.videoTime = 0;
      globalData[room.id].videos.upcoming = [];
      globalData[room.id].videos.previous = [];
      globalData[room.id].videos.history = [];
    }
    // in case of entering emtpy room
    globalData[room.id].inactive = false;
    room.userCount = countUsers(room.users);
    // for ease of use
    room.videos = globalData[room.id].videos;
    // finally join this room
    room.socket.join(room.id);
    // welcome to login socket
    room.io.to(room.socket.id).emit('welcome',
      {
        alias: room.user.alias,
        videos: room.videos,
        users: room.users,
        userCount: room.userCount,
      }
    );
    // user info for all sockets
    room.io.to(room.id).emit('usersInfo',
      {
        users: room.users,
        userCount: room.userCount,
      }
    );
  }
}
