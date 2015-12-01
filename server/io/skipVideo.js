var MESSAGES = require('../constants').MESSAGES;
var calcSkipThreshold = require('../helpers/index').calcSkipThreshold;
var skipStuff = {};

module.exports = function skipVideo(room) {
  var playNextVideo = require('./playNextVideo')(room);
  return function(data){
    if(room.user.skip) {
      room.io.to(room.socket.id).emit('notification',
        {msg: MESSAGES.ALREADY_VOTED});
    } else if(room.videos.current === null) {
      room.io.to(room.socket.id).emit('notification',
        {msg: MESSAGES.NOTHING_TO_SKIP});
    } else {
      room.user.skip = true;
      skipStuff = calcSkipThreshold(room.users);
      room.userCount = skipStuff.userCount;
      room.skipVotes = skipStuff.skipVotes;
      room.skipThreshold = skipStuff.skipThreshold;

      if(room.skipVotes >= room.skipThreshold) {
        // hmmmm...?
        // play next resets data
        playNextVideo({videoId: room.videos.current.id});
        room.io.to(room.id).emit('announcement',
          {msg: MESSAGES.SKIPPING_VIDEO});
      } else {
        room.io.to(room.id).emit('announcement',
          {msg: MESSAGES.WANTS_TO_SKIP(room.user.alias)});
      }
    }

  }

}