module.exports = function updateAlias(room) {
	return function(data){
    room.io.to(room.id).emit('announcement', 
    	{msg: room.user.alias + ' is now ' + data.alias +'!'});
    room.user.alias = data.alias;
  }
}