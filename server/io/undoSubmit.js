var removeFromCollection = require('../helpers').removeFromCollection;

module.exports = function undoSubmit(room) {
  return function(data){
    var lastSubmitted = room.user.lastSubmitted;
    if(lastSubmitted.length > 0) {
      removeFromCollection(room.videos.upcoming, lastSubmitted.pop(), 'id');
      room.io.to(room.id).emit('videoSubmitted',
        {videos: room.videos});
    }
  }
}