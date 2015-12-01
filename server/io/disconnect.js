var helpers = require('../helpers');
var MESSAGES = require('../constants').MESSAGES;

module.exports = function disconnect(globalData, room) {
  return function(){
    // disconnect occasionally misfires of fires before login...
    if(!helpers.isUndefined(room.users)) {
      room.io.to(room.id).emit('announcement',
        {msg: MESSAGES.DISCONNECTED(room.user.alias)});
      delete room.user;
      delete room.users[room.socket.id];
      room.userCount = helpers.countUsers(room.users);
      if(room.userCount === 0) {
        delete globalData.users[room.id];
        delete globalData.videos[room.id];
      } else {
        room.io.to(room.id).emit('usersInfo',
          {
            users: room.users,
            userCount: room.userCount,
          }
        );
      }
      console.log('disconnect');
    }
  }
}