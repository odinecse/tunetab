var isUndefined = require('../helpers').isUndefined;

// this occasionally gets called from old connections, so need to do this test
function checkDataIntegrity(roomVideos) {
  return !isUndefined(roomVideos) && !isUndefined(roomVideos.videoTime);
}

function tickTest(roomVideos, time) {
  return roomVideos.current !== null && roomVideos.videoTime < time;
}

function cleanUpMultipleIds(room, alias) {
  var users = room.users;
  for(user in users) {
    if(user !== room.socket.id) {
      if(users[user].alias === room.user.alias) {
        delete users[user];
      }
    }
  }
}

module.exports = function tick(room) {
  return function(data){

    var clientTime = data.videoTime ? parseInt(data.videoTime, 10) : 0;
    if(checkDataIntegrity(room.videos)) {
      cleanUpMultipleIds(room);
      if(tickTest(room.videos, clientTime)) {
        room.lastActive = new Date();
        room.videos.videoTime = clientTime;
      }
    }

  }
}
