var helpers = require('../helpers/index');
var skipStuff = {};

module.exports = function disconnect(global, room) {
  return function(){
    // disconnect occasionally misfires of fires before login...
    if(!helpers.isUndefined(room.users)) {
      room.io.to(room.id).emit('announcement',
        {msg: room.user.alias + ' disconnected!'});
      delete room.user;
      delete room.users[room.socket.id];
      skipStuff = helpers.calcSkipThreshold(room.users, true);
      room.userCount = skipStuff.userCount;
      room.skipVotes = skipStuff.skipVotes;
      room.skipThreshold = skipStuff.skipThreshold;
      if(skipStuff.userCount === 0) {
        delete global.users[room.id];
        delete global.videos[room.id];
      } else {
        room.io.to(room.id).emit('usersInfo',
          {
            users: room.users,
            userCount: room.userCount,
            skipVotes: room.skipVotes,
            skipThreshold: room.skipThreshold
          }
        );
      }
      console.log('disconnect');
    }
  }
}