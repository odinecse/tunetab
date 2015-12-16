module.exports = function rooms(globalData, room) {
  return function(data){
    room.io.to(room.socket.id).emit('notification', {msg: ''});
    room.io.to(room.socket.id).emit('notification', {msg: 'list of rooms:'});
    for(roomKey in globalData) {
      if(!globalData[roomKey].inactive) {
        room.io.to(room.socket.id).emit('notification', {msg: roomKey});
      }
    }
    room.io.to(room.socket.id).emit('notification', {msg: ''});
  }
}