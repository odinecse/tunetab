module.exports = function message(room) {
  return function(data){
    console.log('msg', data);
    room.io.to(room.id).emit('message',
      {msg: data.msg, alias: data.alias, type: data.type});
  }
}