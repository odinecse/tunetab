module.exports = function updateAlias(room) {
	return function(data){
    room.user.alias = data.alias;
    room.io.to(room.socket.id).emit('aliasUpdated', {alias: room.user.alias});
  }
}