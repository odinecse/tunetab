var mongodb = require('mongodb');
var crypto = require('crypto');
var MongoClient = mongodb.MongoClient;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var animal = require('node-animal');

var url = 'mongodb://localhost:27017/tunetab';
var appPort = 7076;
var userStore = {};

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
  var alias = animal.rand() + randInt(1, 999)

  socket.on('login', function(data){
    alias = data.alias ? data.alias : alias;
    roomId = data.room;
    userStore[roomId] = userStore[roomId] || {};
    userStore[roomId][socket.id] = userStore[roomId][socket.id] || alias;

    console.log(userStore);
    socket.join(roomId);

    io.to(roomId).emit('message', {msg: alias + ' connected!!'});
  });

  socket.on('message', function(data){
    io.to(roomId).emit('message', {msg: data.msg});
  });

  socket.on('updateAlias', function(data){
    io.to(roomId).emit('message', {msg: userStore[roomId][socket.id] + ' is now ' + data.alias +'!!!'});
    userStore[roomId][socket.id] = data.alias;
  });

  socket.on('disconnect', function () {
    io.to(roomId).emit('message', {msg: userStore[roomId][socket.id] + ' disconnected!!!!'});
    delete userStore[roomId][socket.id];
  });

});

MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);
    Rooms = db.collection('rooms');
    http.listen(appPort, function(){
      console.log('listening on *:' + appPort);
    });
  }
});