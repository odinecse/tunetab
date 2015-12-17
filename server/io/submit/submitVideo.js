var request = require('request');

var isUndefined = require('../../helpers').isUndefined;
var MESSAGES = require('../../constants').MESSAGES;
var YOUTUBE_API_URL = require('../../constants').YOUTUBE_API_URL;
var YOUTUBE_API_KEY = require('../../../config').YOUTUBE_API_KEY;

var processVideoURLSubmit = require('./submitHelpers').processVideoURLSubmit;
var processVideoRecSubmit = require('./submitHelpers').processVideoRecSubmit;


module.exports = function submitVideo(room) {
  return function(data) {
    var submitType = data.type;
    var videoId = '';
    var searchTerm = '';
    var url = YOUTUBE_API_URL;
    var errorMsg = MESSAGES.SUBMIT_UKNOWN_ERROR;
    var broadSearch = false;
    var processFunction = function() {};

    if(submitType === "url") {
      videoId = data.videoId;
      url += 'videos?part=id%2Csnippet&id='
                + videoId + '&key=' + YOUTUBE_API_KEY;
      errorMsg = MESSAGES.URL_SUBMIT_ERROR;
      processFunction = processVideoURLSubmit(videoId, room);
    } else if(submitType === "search") {
      searchTerm = data.search;
      url += 'search?part=snippet&q=' + searchTerm
                + '&maxResults=5&videoEmbeddable=true&order=viewCount&type=video&key='
                + YOUTUBE_API_KEY;
      errorMsg = MESSAGES.SEARCH_SUBMIT_ERROR;
      processFunction = processVideoRecSubmit(room);
    } else if(submitType === "rec" || submitType === "recb") {
      // build out broadSearch
      videoId = data.videoId;
      broadSearch = submitType === "recb" ? true : false;
      searchTerm = data.search;
      url += 'search?part=snippet&videoEmbeddable=true&order=viewCount&relatedToVideoId='
                + videoId + 'AO4loowq93Y&type=video&maxResults=20&key='
                + YOUTUBE_API_KEY;
      errorMsg = MESSAGES.SEARCH_SUBMIT_ERROR;
      processFunction = processVideoRecSubmit(room, broadSearch);
    } else {
      room.io.to(room.socket.id).emit('error',
        {msg: errorMsg});
      return;
    }
    console.log('youtube api call:', url);

    request({
      uri: url,
      json: true
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        if(!isUndefined(body.items) && !isUndefined(body.items[0])) {
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
