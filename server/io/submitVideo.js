var request = require('request');
var MESSAGES = require('../constants').MESSAGES;
var isUndefined = require('../helpers').isUndefined;
var YOUTUBE_API_KEY = require('../../config').YOUTUBE_API_KEY;
var YOUTUBE_API_URL = require('../constants').YOUTUBE_API_URL;

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

module.exports = function submitVideo(room) {
  return function(data) {
    var submitType = data.type;
    var videoId = '';
    var searchTerm = '';
    var url = YOUTUBE_API_URL;
    var errorMsg = MESSAGES.SUBMIT_UKNOWN_ERROR;
    var processFunction = function() {};

    if(submitType === "url") {
      videoId = data.video;
      url += 'videos?part=id%2Csnippet&id='
                + videoId + '&key=' + YOUTUBE_API_KEY;
      errorMsg = MESSAGES.URL_SUBMIT_ERROR;
      processFunction = processVideoURLSubmit(videoId, room);
    } else if(submitType === "search") {
      searchTerm = data.search;
      url += 'search?part=snippet&q=' + searchTerm
                + '&maxResults=1&orderby=viewCount&type=video&key='
                + YOUTUBE_API_KEY;
      errorMsg = MESSAGES.SEARCH_SUBMIT_ERROR;
      processFunction = processVideoSearchSubmit(room);
    } else {
      room.io.to(room.socket.id).emit('error',
        {msg: errorMsg});
      return;
    }

    request({
      uri: url,
      json: true
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        if(responseTest(body.items)) {
          processFunction(body);
        } else {
          room.io.to(room.socket.id).emit('error',
            {msg: errorMsg});
        }
      } else {
        room.io.to(room.socket.id).emit('error',
          {msg: MESSAGES.YOUTUBE_API_ERROR});
      }
    });

  }
}
