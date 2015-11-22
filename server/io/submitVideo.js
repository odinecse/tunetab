var request = require('request');
var isUndefined = require('../helpers/index').isUndefined;
var YOUTUBE_API_KEY = 'AIzaSyBlK4TcgxsU4KRFsvSCrBaxerOF6fya0Eo';
var YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/';

function responseTest(items) {
  return !isUndefined(items) && !isUndefined(items[0]);
}

function processVideoSubmit(room, videoId, body) {
  console.log('processVideoSubmit');
  if(responseTest(body.items)) {
    var submittedVideo = {
      id: videoId,
      title: body.items[0].snippet.title,
      thumb: body.items[0].snippet.thumbnails.default,
      user: room.user.alias,
      comment: ''
    };
    if(room.videos.current === null) {
      room.videos.current = submittedVideo;
      room.io.to(room.id).emit('firstVideo', 
        {videos: room.videos});
    } else {
      room.videos.upcoming.push(submittedVideo);
      room.io.to(room.id).emit('videoSubmitted', 
        {videos: room.videos});
    }
  } else {
    console.log('api error');
    room.io.to(room.socket.id).emit('error', 
      {msg: 'invalid video url'});
  }
}

module.exports = function submitVideo(room) {
  return function(data){
    var videoID = data.video;
    var url = YOUTUBE_API_URL + 'videos?part=id%2Csnippet&id='
            + videoID + '&key=' + YOUTUBE_API_KEY;
    request({
        uri: url,
        json: true
      }, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            processVideoSubmit(room, videoID, body);
          } else {
            room.io.to(room.socket.id).emit('error', 
              {msg: 'invalid video url'});
          }
    });
  }
}