var isUndefined = require('../helpers/index').isUndefined;

// this occasionally gets called from old connections, so need to do this test
function checkDataIntegrity(roomVideos) {
	return !isUndefined(roomVideos) && !isUndefined(roomVideos.videoTime);
}

function tickTest(roomVideos, time) {
	return roomVideos.current !== null && roomVideos.videoTime < time;
}

module.exports = function tick(room) {
  return function(data){
    var time = data.videoTime ? parseInt(data.videoTime, 10) : 0;
    if(checkDataIntegrity(room.videos)) {
      if(tickTest(room.videos, time)) {
        room.videos.videoTime = time;
        console.log('videotime: ', room.videos.videoTime);
      }
    }
  }
}