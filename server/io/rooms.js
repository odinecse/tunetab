module.exports = function rooms(globalData, room) {
  return function(data){
    room.io.to(room.socket.id).emit('notification', {msg: 'list of rooms:'});
    for(roomKey in globalData.users) {
      room.io.to(room.socket.id).emit('notification', {msg: roomKey});
    }
  }
}