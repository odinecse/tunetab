var mongodb = require('mongodb');
var crypto = require('crypto');
var MongoClient = mongodb.MongoClient;

var url = 'mongodb://localhost:27017/tunetab';

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var appPort = 7076;

var userStore = {};

function getToken(ln) {
  var buf = crypto.randomBytes(ln);
  return buf.toString('hex');
}

app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res) {
  var newRoom = getToken(8);
  res.redirect('/r/' + newRoom);
});

app.get('/r/:token', function(req, res) {
  res.render('chat.ejs', {room: req.params.token});
});

io.on('connection', function(socket){
  var roomId = '';

  socket.on('login', function(room){
    roomId = room;
    userStore[roomId] = userStore[roomId] || {};
    userStore[roomId][socket.id] = userStore[roomId][socket.id] || {};

    console.log();
    console.log(userStore);
    socket.join(roomId);
    io.to(socket.id).emit('welcome', 'bob');
  });

  socket.on('message', function(msg){
    io.to(roomId).emit('message', msg);
  });

  socket.on('disconnect', function () {
    io.emit('user disconnected');
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