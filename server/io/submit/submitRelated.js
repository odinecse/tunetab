var request = require('request');

var MESSAGES = require('../../constants').MESSAGES;
var isUndefined = require('../../helpers').isUndefined;
var YOUTUBE_API_URL = require('../../constants').YOUTUBE_API_URL;
var YOUTUBE_API_KEY = require('../../../config').YOUTUBE_API_KEY;

var responseTest = require('./submitHelpers').responseTest;
var processVideoRecSubmit = require('./submitHelpers').processVideoRecSubmit;

module.exports = function submitRelated(room) {
  return function(data) {
    var url = YOUTUBE_API_URL + 'search?part=snippet&relatedToVideoId='
                + data.videoId + 'AO4loowq93Y&type=video&key='
                + YOUTUBE_API_KEY;
    var processFunction = function() {};
    request({
      uri: url,
      json: true
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        if(responseTest(body.items)) {
          processFunction = processVideoRecSubmit(room);
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
