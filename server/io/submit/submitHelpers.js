var isUndefined = require('../../helpers').isUndefined;
var MAX_REC_ID_INDEX = require('../../constants').MAX_REC_ID_INDEX;
var MESSAGES = require('../../constants').MESSAGES;

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

function processVideoRecSubmit(room) {
  return function(body, endOfPlaylist) {
    var index = room.currentRecIndex;
    var length = body.items.length - 1;
    var submittedVideo = {};
    
    if(index === MAX_REC_ID_INDEX || index >= length || length < 0) {
      room.io.to(room.id).emit('announcement',
          {msg: MESSAGES.NO_MORE_RECS});
      return;
    }

    submittedVideo = {
      id: body.items[index].id.videoId,
      title: body.items[index].snippet.title,
      thumb: body.items[index].snippet.thumbnails.default,
      user: room.user.alias,
    };
    room.currentRecIndex++;
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
  processVideoRecSubmit: processVideoRecSubmit,
  processVideoSearchSubmit: processVideoSearchSubmit
}