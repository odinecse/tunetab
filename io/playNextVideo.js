function nextTest(roomVideos, videoId) {
  return roomVideos.current !== null && roomVideos.current.id === data.videoId;
}

module.exports = function playNextVideo(room) {
  return function(data){
    console.log('playNextVideo');
    if(nextTest(room.videos, data.videoId)) {
      if(room.videos.previous.length > 10) {
        room.videos.previous.pop();
      }
      room.videos.previous.unshift(room.videos.current);
      if(room.videos.upcoming.length > 0) {
        room.videos.current = room.videos.upcoming.shift();
      } else {
        room.videos.current = null;
      }
      room.videos.videoTime = 0;
    }
    room.io.to(room.socket.id).emit('playVideo', 
      {videos: room.videos});
  }
}