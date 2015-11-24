var calcSkipThreshold = require('../helpers/index').calcSkipThreshold;
var resetUserVotes = require('../helpers/index').resetUserVotes;
var skipStuff = {};

module.exports = function skipVideo(room) {

  return function(data){

    if(room.user.skip) {
      room.io.to(room.socket.id).emit('notification',
      	{msg: 'you\'ve already voted'});
    } else {
      room.user.skip = true;
      skipStuff = calcSkipThreshold(room.users);
      room.userCount = skipStuff.userCount;
      room.skipVotes = skipStuff.skipVotes;
      room.skipThreshold = skipStuff.skipThreshold;
      if(room.skipVotes >= room.skipThreshold) {
        room.skipVotes = 0;
        room.io.to(room.id).emit('announcement',
          {msg: 'skipping video!'});
        room.io.to(room.id).emit('skippingVideo',
          {skipVotes: room.skipVotes});
      } else {
        room.io.to(room.id).emit('skipVoteChanged',
          {skipVotes: room.skipVotes});
        room.io.to(room.id).emit('announcement',
        	{msg: room.user.alias + ' wants to skip this video!'});
      }
    }

  }

}