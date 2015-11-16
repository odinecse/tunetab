var helpers = require('../helpers/index');
var skipStuff = {};

module.exports = function disconnect(room) {
  return function(){
    // disconnect occasionally misfires of fires before login...
    if(!helpers.isUndefined(room.users)) {
      room.io.to(room.id).emit('announcement', 
      	{msg: room.user.alias + ' disconnected!'});
      delete room.user;
      skipStuff = helpers.calcSkipThreshold(room.users, true);
      room.userCount = skipStuff.userCount;
	    room.skipVotes = skipStuff.skipVotes;
	    room.skipThreshold = skipStuff.skipThreshold;
	    room.io.to(room.id).emit('usersInfo', 
	      {
	        users: room.users, 
	        userCount: room.userCount, 
	        skipVotes: room.skipVotes, 
	        skipThreshold: room.skipThreshold
	      }
	    );
	    console.log('disconnect', room.users);
    }
  }
}