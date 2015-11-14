var crypto = require('crypto');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var animal = require('node-animal');
var request = require('request');
// var assert = require('assert');
// var mongodb = require('mongodb');
// var MongoClient = mongodb.MongoClient;
// var mongoObjectId = require('mongodb').ObjectID;
// var MONGO_URL = 'mongodb://localhost:27017/tunetab';
var userStore = {};
var videoStore = {};
// var mdb = {};

var YOUTUBE_API_KEY = 'AIzaSyBlK4TcgxsU4KRFsvSCrBaxerOF6fya0Eo';
var YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/';
var APP_PORT = 7076;

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getToken(ln) {
  var buf = crypto.randomBytes(ln);
  return buf.toString('hex');
}

function processVideoSubmit(io, socket, roomId, alias, videoStore, videoID, body) {
  console.log('processVideoSubmit');
  if(typeof body.items !== 'undefined' && typeof body.items[0] !== 'undefined') {
    var submittedVideo = {
      videoId: videoID,
      videoTitle: body.items[0].snippet.title,
      videoThumb: body.items[0].snippet.thumbnails.default,
      user: alias,
      comment: ''
    };
    if(videoStore[roomId].current === null) {
      videoStore[roomId].current = submittedVideo;
      io.to(roomId).emit('firstVideo', {video: videoStore[roomId]});
    } else {
      videoStore[roomId].upcomingVideos.push(submittedVideo);
      io.to(roomId).emit('videoSubmitted', {video: videoStore[roomId]});
    }
    console.log(videoStore[roomId]);
  } else {
    console.log('api error');
    io.to(socket.id).emit('error', {msg: 'invalid video url'});
  }
}

app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
  var newRoom = getToken(8);
  res.redirect('/r/' + newRoom);
});

app.get('/r/:token', function(req, res) {
  res.render('room.ejs', {room: req.params.token});
});

io.on('connection', function(socket){
  var roomId = '';
  var alias = animal.rand() + randInt(1, 999);

  socket.on('login', function(data){
    alias = data.alias ? data.alias : alias;
    roomId = data.room;
    userStore[roomId] = userStore[roomId] || {};
    userStore[roomId][socket.id] = userStore[roomId][socket.id] || alias;
    videoStore[roomId] = videoStore[roomId] || {};
    if(typeof videoStore[roomId].current === "undefined") {
      videoStore[roomId].current = null;
      videoStore[roomId].currentVideoTime = 0;
      videoStore[roomId].upcomingVideos = [];
      videoStore[roomId].previousVideos = [];
    }
    socket.join(roomId);
    io.to(socket.id).emit('welcome', {alias: alias, video: videoStore[roomId]});
    io.to(roomId).emit('announcement', {msg: alias + ' connected!'});
    console.log('USERSTORE:', userStore);
    console.log('VIDEOSTORE:', videoStore);
  });

  socket.on('message', function(data){
    io.to(roomId).emit('message', {msg: data.msg});
  });

  socket.on('submitVideo', function(data){
    var videoID = data.video;
    var url = YOUTUBE_API_URL + 'videos?part=id%2Csnippet&id='
            + videoID + '&key=' + YOUTUBE_API_KEY;
    request({
        uri: url,
        json: true
      }, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            processVideoSubmit(io, socket, roomId, alias, videoStore, videoID, body);
          } else {
            io.to(socket.id).emit('error', {msg: 'invalid video url'});
          }
    });
  });

  socket.on('getVideoTime', function(data){
     io.to(roomId).emit('officialVideoTime', {video: videoStore[roomId]});
  });

  socket.on('tick', function(data) {
    var time = data.videoTime ? parseInt(data.videoTime, 10) : 0;
    if(typeof videoStore[roomId] !== 'undefined' && typeof videoStore[roomId].currentVideoTime !== 'undefined') {
      if(videoStore[roomId].current !== null && videoStore[roomId].currentVideoTime < time) {
        videoStore[roomId].currentVideoTime = data.videoTime;
        console.log('videotime: ', videoStore[roomId].currentVideoTime);
      }
    }
  });

  socket.on('playNextVideo', function(data){
    console.log('playNextVideo');
    if(videoStore[roomId].current !== null && videoStore[roomId].current.videoId === data.videoId) {
      if(videoStore[roomId].previousVideos.length > 10) {
        videoStore[roomId].previousVideos.pop();
      }
      videoStore[roomId].previousVideos.unshift(videoStore[roomId].current);
      if(videoStore[roomId].upcomingVideos.length > 0) {
        videoStore[roomId].current = videoStore[roomId].upcomingVideos.shift();
      } else {
        videoStore[roomId].current = null;
      }
      videoStore[roomId].currentVideoTime = 0;
    } else {
      console.log('not: if(videoStore[roomId].current.videoId === data.videoId {');
    }
    console.log(videoStore[roomId]);
    io.to(socket.id).emit('playVideo', {video: videoStore[roomId]});
  });

  socket.on('updateAlias', function(data){
    io.to(roomId).emit('announcement', {msg: userStore[roomId][socket.id] + ' is now ' + data.alias +'!'});
    userStore[roomId][socket.id] = data.alias;
  });

  socket.on('disconnect', function () {
    // disconnect occasionally misfires of fires before login...
    if(typeof userStore[roomId] !== "undefined") {
      io.to(roomId).emit('announcement', {msg: userStore[roomId][socket.id] + ' disconnected!'});
      delete userStore[roomId][socket.id];
    }
  });

});

// MongoClient.connect(MONGO_URL, function (err, db) {
//   if (err) {
//     console.log('Unable to connect to the mongoDB server. Error:', err);
//   } else {
//     console.log('Connection established to', MONGO_URL);
//     mdb = db;
    http.listen(APP_PORT, function(){
      console.log('listening on *:' + APP_PORT);
    });
//   }
// });
