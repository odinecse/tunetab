var isUndefined = require('../helpers/index').isUndefined;

module.exports = function login(global, room) {
  return function(data){
    room.user.alias = data.alias ? data.alias : room.user.alias;
    room.id = data.room;
    global.users[room.id] = global.users[room.id] || {};
    room.users = global.users[room.id];
    room.users[room.socket.id] = room.users[room.socket.id] || room.user;
    global.videos[room.id] = global.videos[room.id] || {};
    if(isUndefined(global.videos[room.id].current)) {
      global.videos[room.id].current = null;
      global.videos[room.id].videoTime = 0;
      global.videos[room.id].upcoming = [];
      global.videos[room.id].previous = [];
    }
    room.videos = global.videos[room.id];
    room.socket.join(room.id);

    room.io.to(room.socket.id).emit('welcome', 
      {alias: room.user.alias, videos: room.videos});
    room.io.to(room.id).emit('announcement', 
      {msg: room.user.alias + ' connected!'});
    
    console.log('USERSTORE:', global.users);
    console.log('VIDEOSTORE:', global.videos);
  }
}