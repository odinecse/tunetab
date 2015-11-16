module.exports = function skipVideo(room) {
  return function(data){
    if(room.user.skip) {
      room.io.to(room.socket.id).emit('pm', 
      	{msg: 'you\'ve already voted'});  
    } else {
      room.user.skip = true;  
      room.io.to(room.id).emit('announcement', 
      	{msg: room.user.alias + ' wants to skip this video!'});
    }
  }
}