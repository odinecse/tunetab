function removeFromHistory(history, videoId) {
  var i = history.indexOf(videoId);
  if(i > -1) {
    history.splice(i, 1);
  };
}

function removeFromUpcoming(upcoming, videoId) {
  var i = upcoming.findIndex(function(video) {
    return video.id === videoId ? true : false;
  });
  if(i > -1) {
    upcoming.splice(i, 1);
  };
}

module.exports = function undoSubmit(room) {
  return function(data){
    var lastSubmitted = room.user.lastSubmitted;
    if(lastSubmitted !== null) {
      removeFromUpcoming(room.videos.upcoming, lastSubmitted);
      removeFromHistory(room.videos.history, lastSubmitted);
      room.user.lastSubmitted = null;
      room.io.to(room.id).emit('videoSubmitted',
        {videos: room.videos});
    }
  }
}