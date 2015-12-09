var path = require('path');
var crypto = require('crypto');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var applicationIo = require('./server/io/index')(io);
var APP_PORT = require('./config').APP_PORT;
var GOOGLE_ANALYTICS_ID = require('./config').GOOGLE_ANALYTICS_ID;

function getToken(ln) {
  var buf = crypto.randomBytes(ln);
  return buf.toString('hex');
}

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, '/server/views'));
app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res) {
  var newRoom = getToken(8);
  res.redirect('/r/' + newRoom);
});

app.get('/r/:token', function(req, res) {
  var token = req.params.token;
  token = token.slice(0, 17);
  res.render('room.ejs', {
    room: token,
    googleAnalyticsId: GOOGLE_ANALYTICS_ID
  });
});

io.on('connection', applicationIo);

http.listen(APP_PORT, function(){
  console.log('listening on *:' + APP_PORT);
});
