var isUndefined = require('../../helpers').isUndefined;

function submitLogic(submittedVideo, room) {
  if(room.videos.current === null) {
    room.videos.current = submittedVideo;
    room.io.to(room.id).emit('playVideo',
      {videos: room.videos});
  } else {
    room.user.lastSubmitted = submittedVideo.id;
    room.videos.upcoming.push(submittedVideo);
    room.io.to(room.id).emit('videoSubmitted',
      {videos: room.videos});
  }
}

function responseTest(items) {
  return !isUndefined(items) && !isUndefined(items[0]);
}

function processVideoURLSubmit(videoId, room) {
  return function(body) {
    var submittedVideo = {
      id: videoId,
      title: body.items[0].snippet.title,
      thumb: body.items[0].snippet.thumbnails.default,
      user: room.user.alias,
    };
    submitLogic(submittedVideo, room);
  }
}

function processVideoSearchSubmit(room) {
  return function(body) {
    var submittedVideo = {
      id: body.items[0].id.videoId,
      title: body.items[0].snippet.title,
      thumb: body.items[0].snippet.thumbnails.default,
      user: room.user.alias,
    };
    submitLogic(submittedVideo, room);
  }
}

module.exports = {
  submitLogic: submitLogic,
  responseTest: responseTest,
  processVideoURLSubmit: processVideoURLSubmit,
  processVideoSearchSubmit: processVideoSearchSubmit
}