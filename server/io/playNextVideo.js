var resetUserVotes = require('../helpers').resetUserVotes;
var MAX_PREVIOUS_VIDEOS = require('../constants').MAX_PREVIOUS_VIDEOS;

function nextTest(roomVideos, videoId) {
  return roomVideos.current !== null && roomVideos.current.id === videoId;
}

module.exports = function playNextVideo(room) {
  return function(data){
    if(nextTest(room.videos, data.videoId)) {
      if(room.videos.previous.length > MAX_PREVIOUS_VIDEOS) {
        room.videos.previous.pop();
      }
      room.videos.previous.unshift(room.videos.current);
      if(room.videos.upcoming.length > 0) {
        room.videos.current = room.videos.upcoming.shift();
      } else {
        room.videos.current = null;
      }
      room.skipVotes = 0;
      room.videos.videoTime = 0;
      resetUserVotes(room.users);
      room.io.to(room.id).emit('playVideo',
        {videos: room.videos});
    }
  }
}