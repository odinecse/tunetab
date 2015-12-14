var isUndefined = require('../../helpers').isUndefined;
var randomIntBetween = require('../../helpers').randomIntBetween;
var MESSAGES = require('../../constants').MESSAGES;

function submitLogic(submittedVideo, room) {
  room.videos.history.push(submittedVideo.id);
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
  room.io.to(room.id).emit('announcement',
    {msg: MESSAGES.SUBMITTED_ANNOUNCEMENT(submittedVideo.title, submittedVideo.user)});
}

function dupTest(history, videoId) {
  return history.length > 0 && history.indexOf(videoId) > -1;
}

function processVideoURLSubmit(videoId, room) {
  return function(body) {
    if(dupTest(room.videos.history, videoId)) {
      room.io.to(room.socket.id).emit('error',
          {msg: MESSAGES.SUBMIT_DUPLICATE});
      return;
    }
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
  // build out broadSearch
  return function(body, broadSearch, searchIndex) {
    var notRecursive =  isUndefined(searchIndex) ? true : false;
    var index = notRecursive ? 0 : searchIndex;
    var length = body.items.length - 1;
    var submittedVideo = {};
    var videoId = '';
    var processFunction = function(){};

    if(length < 0 || index > length) {
      room.io.to(room.id).emit('announcement',
          {msg: MESSAGES.NO_MORE_RECS});
      return;
    }

    // causing bad experience?
    // if(notRecursive) {
    //   index = randomIntBetween(index, length);
    // }

    videoId = body.items[index].id.videoId;
    if(dupTest(room.videos.history, videoId)) {
      processFunction = processVideoRecSubmit(room);
      index++;
      processFunction(body, broadSearch, index);
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

module.exports = {
  processVideoURLSubmit: processVideoURLSubmit,
  processVideoRecSubmit: processVideoRecSubmit,
}