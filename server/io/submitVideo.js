var request = require('request');
var MESSAGES = require('../constants').MESSAGES;
var isUndefined = require('../helpers').isUndefined;
var YOUTUBE_API_KEY = require('../../config').YOUTUBE_API_KEY;
var YOUTUBE_API_URL = require('../constants').YOUTUBE_API_URL;

function responseTest(items) {
  return !isUndefined(items) && !isUndefined(items[0]);
}

function processVideoURLSubmit(room, videoId, body) {
  if(responseTest(body.items)) {
    var submittedVideo = {
      id: videoId,
      title: body.items[0].snippet.title,
      thumb: body.items[0].snippet.thumbnails.default,
      user: room.user.alias,
    };
    if(room.videos.current === null) {
      room.videos.current = submittedVideo;
      room.io.to(room.id).emit('playVideo', 
        {videos: room.videos});
    } else {
      room.videos.upcoming.push(submittedVideo);
      room.io.to(room.id).emit('videoSubmitted', 
        {videos: room.videos});
    }
  } else {
    room.io.to(room.socket.id).emit('error', 
      {msg: MESSAGES.SUBMIT_GENERAL_ERROR});
  }
}

function processVideoSearchSubmit(room, body) {
  if(responseTest(body.items)) {
    var submittedVideo = {
      id: videoId,
      title: body.items[0].snippet.title,
      thumb: body.items[0].snippet.thumbnails.default,
      user: room.user.alias,
    };
    if(room.videos.current === null) {
      room.videos.current = submittedVideo;
      room.io.to(room.id).emit('playVideo', 
        {videos: room.videos});
    } else {
      room.videos.upcoming.push(submittedVideo);
      room.io.to(room.id).emit('videoSubmitted', 
        {videos: room.videos});
    }
  } else {
    room.io.to(room.socket.id).emit('error', 
      {msg: MESSAGES.SUBMIT_GENERAL_ERROR});
  }
}

function requestWrapper(url, room, callback) {
  request({
    uri: url,
    json: true
  }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback();
      } else {
        room.io.to(room.socket.id).emit('error', 
          {msg: MESSAGES.SUBMIT_GENERAL_ERROR});
      }
  });
}

module.exports = function submitVideo(room) {
  return function(data) {
    var submitType = data.type;
    var videoID = data.video;
    var searchTerm = data.search;
    var url = YOUTUBE_API_URL;

    if(submitType === "url") {
      url += 'videos?part=id%2Csnippet&id='
                + videoID + '&key=' + YOUTUBE_API_KEY;
      requestWrapper(url, room, function() {
        processVideoURLSubmit(room, videoID, body);
      });
    } else if(submitType === "search") {
      url += 'search?part=snippet&q=' + query 
                + '&maxResults=1&orderby=viewCount&type=video&key=' 
                + YOUTUBE_API_KEY;
      requestWrapper(url, room, function() {
        processVideoSearchSubmit(room, body);
      });
    }

  }
}
