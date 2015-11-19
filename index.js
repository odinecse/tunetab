var crypto = require('crypto');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.dev');
var compiler = webpack(webpackConfig);
var applicationIo = require('./io/index')(io);
var APP_PORT = 7076;

function getToken(ln) {
  var buf = crypto.randomBytes(ln);
  return buf.toString('hex');
}

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));
app.use(express.static(__dirname + '/public'));

app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res) {
  var newRoom = getToken(8);
  res.redirect('/r/' + newRoom);
});

app.get('/r/:token', function(req, res) {
  res.render('room.ejs', {room: req.params.token});
});

io.on('connection', applicationIo);

http.listen(APP_PORT, function(){
  console.log('listening on *:' + APP_PORT);
});
