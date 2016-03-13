var request = require('request');

var isUndefined = require('../../helpers').isUndefined;
var MESSAGES = require('../../constants').MESSAGES;
var YOUTUBE_API_URL = require('../../constants').YOUTUBE_API_URL;
var YOUTUBE_API_KEY = require('../../../config').YOUTUBE_API_KEY;

var processVideoURLSubmit = require('./submitHelpers').processVideoURLSubmit;
var processVideoRecSubmit = require('./submitHelpers').processVideoRecSubmit;
var formatSearchResults = require('./submitHelpers').formatSearchResults;

module.exports = function submitVideo(room) {
  return function(data) {
    var submitType = data.type;
    var videoId = '';
    var searchTerm = '';
    var apiQuery = '';
    var errorMsg = MESSAGES.SUBMIT_UKNOWN_ERROR;
    var processFunction = function() {};

    if(submitType === 'url') {
      videoId = data.videoId;
      apiQuery += 'videos?part=id%2Csnippet&id='
                + videoId + '&key=' + YOUTUBE_API_KEY;
      errorMsg = MESSAGES.URL_SUBMIT_ERROR;
      processFunction = processVideoURLSubmit(videoId, room);
    } else if(submitType === 'search') {
      searchTerm = data.search;
      apiQuery += 'search?part=snippet&q=' + searchTerm
                + '&maxResults=5&videoEmbeddable=true&order=viewCount&type=video&key='
                + YOUTUBE_API_KEY;
      errorMsg = MESSAGES.SEARCH_SUBMIT_ERROR;
      processFunction = processVideoRecSubmit(room);
    } else if(submitType === 'searchq') {
      searchTerm = data.search;
      apiQuery += 'search?part=snippet&q=' + searchTerm
                + '&maxResults=10&videoEmbeddable=true&order=viewCount&type=video&key='
                + YOUTUBE_API_KEY;
      errorMsg = MESSAGES.SEARCH_SUBMIT_ERROR;
    } else if(submitType === 'rec') {
      videoId = data.videoId;
      searchTerm = data.search;
      apiQuery += 'search?part=snippet&videoEmbeddable=true&order=viewCount&relatedToVideoId='
                + videoId + '&type=video&maxResults=10&key='
                + YOUTUBE_API_KEY;
      errorMsg = MESSAGES.SEARCH_SUBMIT_ERROR;
    } else if(submitType === 'autorec') {
      videoId = data.videoId;
      searchTerm = data.search;
      apiQuery += 'search?part=snippet&videoEmbeddable=true&order=viewCount&relatedToVideoId='
                + videoId + '&type=video&maxResults=20&key='
                + YOUTUBE_API_KEY;
      errorMsg = MESSAGES.SEARCH_SUBMIT_ERROR;
      processFunction = processVideoRecSubmit(room);
    } else {
      room.io.to(room.socket.id).emit('error',
        {msg: errorMsg});
      return;
    }

    request({
      uri: YOUTUBE_API_URL + apiQuery,
      json: true
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        if(!isUndefined(body.items) && !isUndefined(body.items[0])) {
          if(submitType === 'searchq' || submitType === 'rec') {
            room.io.to(room.socket.id).emit('searchresults',
              {results: formatSearchResults(body.items)});
            return;
          }
          processFunction(body);
        } else {
          room.io.to(room.socket.id).emit('error',
            {msg: errorMsg});
        }
      } else {
        console.log('error query:', YOUTUBE_API_URL + apiQuery);
        if(!isUndefined(body.error)){
          console.log(body.error);
          errorMsg = 'e: ' + body.error.code + ' m:' + body.error.message;
        }

        room.io.to(room.socket.id).emit('error',
          {msg: MESSAGES.YOUTUBE_API_ERROR(errorMsg)});
      }
    });

  }
}
