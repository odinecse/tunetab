var isUndefined = require('../../helpers').isUndefined;
var randomIntBetween = require('../../helpers').randomIntBetween;
var MESSAGES = require('../../constants').MESSAGES;

function submitLogic(submittedVideo, room) {
  room.videos.history.push(submittedVideo.id);
  if(room.videos.current === null) {
    room.videos.videoTime = 0;
    room.videos.current = submittedVideo;
    room.io.to(room.id).emit('playVideo',
      {videos: room.videos});
  } else {
    room.user.lastSubmitted.push(submittedVideo.id);
    room.videos.upcoming.push(submittedVideo);
    room.io.to(room.id).emit('videoSubmitted',
      {videos: room.videos});
  }
  room.io.to(room.id).emit('announcement',
    {msg: MESSAGES.SUBMITTED_ANNOUNCEMENT(submittedVideo.title, submittedVideo.user)});
}

function dupTest(history, videoId) {
  if(isUndefined(history)) {
    return false;
  }
  if(isUndefined(videoId)) {
    return false;
  }
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
  return function(body, searchIndex) {
    var notRecursive =  isUndefined(searchIndex) ? true : false;
    var index = notRecursive ? 0 : searchIndex;
    var length = body.items.length - 1;
    var submittedVideo = {};
    var videoId = '';
    var processFunction = function(){};
    var user = 'robot?';

    if(!isUndefined(room.user) && !isUndefined(room.user.alias)) {
      user = room.user.alias;
    }

    if(length < 0 || index > length) {
      room.io.to(room.id).emit('announcement',
          {msg: MESSAGES.NO_MORE_RECS});
      return;
    }
    videoId = body.items[index].id.videoId;
    if(dupTest(room.videos.history, videoId)) {
      processFunction = processVideoRecSubmit(room);
      index++;
      processFunction(body, index);
      return;
    }
    submittedVideo = {
      id: body.items[index].id.videoId,
      title: body.items[index].snippet.title,
      thumb: body.items[index].snippet.thumbnails.default,
      user: user,
    };
    room.currentRecIndex++;
    submitLogic(submittedVideo, room);
  }
}

function formatSearchResults(items) {
  return items.map(function(item, i) {
    return {
      id: item.id.videoId,
      title: item.snippet.title
    };
  });
}

module.exports = {
  formatSearchResults: formatSearchResults,
  processVideoURLSubmit: processVideoURLSubmit,
  processVideoRecSubmit: processVideoRecSubmit,
}