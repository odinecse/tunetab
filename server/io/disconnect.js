var isUndefined = require('../helpers').isUndefined;
var countUsers = require('../helpers').countUsers;
var MESSAGES = require('../constants').MESSAGES;

module.exports = function disconnect(globalData, room) {

  return function(){
    var threeDays = (1000*60*60*24*3);
    // disconnect occasionally misfires of fires before login...
    if(!isUndefined(globalData[room.id])) {
      delete room.user;
      delete room.users[room.socket.id];
      room.userCount = countUsers(room.users);
      // delete if more than 3 days old without being active
      if(room.lastActive < (new Date() - threeDays)) {
        delete globalData[room.id];
      } else if(room.userCount === 0) {
        console.log(globalData[room.id]);
        globalData[room.id].inactive = true;
      } else {
        room.io.to(room.id).emit('usersInfo',
          {
            users: room.users,
            userCount: room.userCount,
          });
      }
    }

  }
}