var resetUserVotes = require('../helpers').resetUserVotes;
var isUndefined = require('../helpers').isUndefined;
var removeFromArray = require('../helpers').removeFromArray;
var MAX_PREVIOUS_VIDEOS = require('../constants').MAX_PREVIOUS_VIDEOS;
var MESSAGES = require('../constants').MESSAGES;

var returnFalse = function() {return false};
var testFunct = function(roomVideos, videoId) {
  return roomVideos.current !== null && roomVideos.current.id === videoId;
}
var nextTest = function(roomVideos, videoId) {
  nextTest = returnFalse;
  return testFunct(roomVideos, videoId);
}
var resetTestFunctionDelay = function() {
  setTimeout(function() {
    nextTest = testFunct;
  }, 3000);
}

module.exports = function playNextVideo(room) {
  return function(data){
    var previousId = room.videos.current.id;
    var submitVideo = require('./submit/submitVideo')(room);
    room.skipVotes = 0;
    room.videos.videoTime = 0;
    resetUserVotes(room.users);
    if(nextTest(room.videos, data.videoId)) {
      resetTestFunctionDelay();
      if(room.videos.previous.length > MAX_PREVIOUS_VIDEOS) {
        room.videos.previous.pop();
      }
      room.videos.previous.unshift(room.videos.current);
      if(room.videos.upcoming.length > 0) {
        room.videos.current = room.videos.upcoming.shift();
        removeFromArray(room.user.lastSubmitted, room.videos.current.id);
        room.io.to(room.id).emit('playVideo',
          {videos: room.videos});
        room.io.to(room.id).emit('announcement',
          {msg: MESSAGES.NOW_PLAYING(room.videos.current.title, room.videos.current.user)});
      } else {
        room.videos.current = null;
        submitVideo({videoId: previousId, type: 'rec'});
      }
    }
  }
}
