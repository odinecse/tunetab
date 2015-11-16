var isUndefined = require('../helpers/index').isUndefined;

module.exports = function disconnect(room) {
  return function(){
    // disconnect occasionally misfires of fires before login...
    if(!isUndefined(room.users)) {
      room.io.to(room.id).emit('announcement', 
      	{msg: room.user.alias + ' disconnected!'});
      delete room.user;
    }
  }
}