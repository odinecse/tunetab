var crypto = require('crypto');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var animal = require('node-animal');
var request = require('request');
// var assert = require('assert');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
// var mongoObjectId = require('mongodb').ObjectID;
var mongoUrl = 'mongodb://localhost:27017/tunetab';
var userStore = {};
var videoStore = {};
var mdb = {};

// how to get fresh object
// var schema = {
//   roomId: '',
//   users: {},
//   currentVideo: null,
//   currentVideoTime: null,
//   upcomingVideos: [
//     {
//        ADD USERS COMMENT ABOUT THE VIDEO, FOR FUN!!!
//       user: null,
//       video: ''
//     }
//   ],
//   previousVideos: [
//     {
//       user: null,
//       video: ''
//     }
//   ]
// };
var YOUTUBE_API_KEY = 'AIzaSyBlK4TcgxsU4KRFsvSCrBaxerOF6fya0Eo';
var YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/';
var appPort = 7076;



function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getToken(ln) {
  var buf = crypto.randomBytes(ln);
  return buf.toString('hex');
}

app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
  var newRoom = getToken(8);
  res.redirect('/r/' + newRoom);
});

app.get('/r/:token', function(req, res) {
  res.render('chat.ejs', {room: req.params.token});
});

io.on('connection', function(socket){
  var roomId = '';
  var alias = animal.rand() + randInt(1, 999);
  // db.collection('rooms');

  socket.on('login', function(data){
    alias = data.alias ? data.alias : alias;
    roomId = data.room;
    // mdb.collection('rooms').findOne(
    //   {"roomId": roomId},
    //   function(err, results) {
    //     console.log(results);
    // });

    userStore[roomId] = userStore[roomId] || {};
    userStore[roomId][socket.id] = userStore[roomId][socket.id] || alias;
    videoStore[roomId] = videoStore[roomId] || {};
    // how to check if obj is empty
    if(typeof videoStore[roomId].currentVideo === "undefined") {
      videoStore[roomId].currentVideo = null;
      videoStore[roomId].currentVideoTime = 90;
      videoStore[roomId].upcomingVideos = [];
    }
    socket.join(roomId);
    io.to(socket.id).emit('welcome', {alias: alias, video: videoStore[roomId]});
    io.to(roomId).emit('announcement', {msg: alias + ' connected!'});
  });

  socket.on('message', function(data){
    io.to(roomId).emit('message', {msg: data.msg});
  });

  socket.on('submitVideo', function(data){
    var videoID = data.video;
    var url = YOUTUBE_API_URL + 'videos?part=id%2Csnippet&id=' 
            + videoID + '&key=' + YOUTUBE_API_KEY;
    console.log(url);
    request({
        uri: url, 
        json: true
      }, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            if(typeof body.items !== 'undefiend' && typeof body.items[0] !== 'undefiend') {
              console.log(body.items[0].snippet.title);
              console.log(body.items[0].snippet.thumbnails.default);
              if(!videoStore[roomId].currentVideo) {
                videoStore[roomId].currentVideo = videoID;
                io.to(roomId).emit('startVideo', {video: videoStore[roomId]});
              } else {
                console.log('add to upcoming');
              }
              
            } else {
              console.log('api error');
            }
          } else {
            console.log('api error');
          }
    });
    // io.to(roomId).emit('message', {msg: data.msg});
  });

  socket.on('videoSubmitted', function(data){
    // 
  });

  socket.on('getVideoTime', function(data){
     io.to(roomId).emit('officialVideoTime', {video: videoStore[roomId]});
  });

  socket.on('tick', function(data){
    if(typeof videoStore[roomId] !== 'undefiend') {
      if(videoStore[roomId].currentVideoTime < parseInt(data.videoTime), 10) {
        videoStore[roomId].currentVideoTime = data.videoTime;
        console.log(videoStore[roomId].currentVideoTime);
      } else {
        console.log('tickkking and doing nothing');
      }
    } else {
      console.log('undefined!!!videoStore[roomId]')
    }
    
  });

  socket.on('skipVideo', function(data){
    console.log('skipVideo placeholder');
    // io.to(roomId).emit('message', {msg: data.msg});
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

MongoClient.connect(mongoUrl, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', mongoUrl);
    mdb = db;
    http.listen(appPort, function(){
      console.log('listening on *:' + appPort);
    });
  }
});
