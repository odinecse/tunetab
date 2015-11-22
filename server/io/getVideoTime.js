module.exports = function getVideoTime(room) {
  return function(data) {
     room.io.to(room.id).emit('officialVideoTime', 
     	{videoTime: room.videos.videoTime});
  };
}