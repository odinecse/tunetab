module.exports = function updateAlias(room) {
	return function(data){
    var alias = data.alias;
    var rx = /\W/i;
    if(rx.test(alias)) {
      alias = 'neo';
    }
    room.user.alias = alias;
    room.io.to(room.socket.id).emit('aliasUpdated', {alias: room.user.alias});
    room.io.to(room.id).emit('usersInfo',
      {
        users: room.users,
        userCount: room.userCount,
      });
  }
}