module.exports = function updateAlias(room) {
	return function(data){
    room.user.alias = data.alias;
  }
}