module.exports = function undoSubmit(room) {
  return function(data){
    var lastSubmitted = room.user.lastSubmitted;
    var upcoming = room.videos.upcoming;
    if(lastSubmitted !== null) {
      var i = upcoming.findIndex(function(video) {
        return video.id === lastSubmitted ? true : false ;
      });
      upcoming.splice(i, 1);
      room.io.to(room.id).emit('videoSubmitted',
        {videos: room.videos});
    }
  }
}