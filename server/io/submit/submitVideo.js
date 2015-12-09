var request = require('request');
var MESSAGES = require('../../constants').MESSAGES;
var YOUTUBE_API_URL = require('../../constants').YOUTUBE_API_URL;
var YOUTUBE_API_KEY = require('../../../config').YOUTUBE_API_KEY;

var responseTest = require('./submitHelpers').responseTest;
var processVideoURLSubmit = require('./submitHelpers').processVideoURLSubmit;
var processVideoSearchSubmit = require('./submitHelpers').processVideoSearchSubmit;

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
