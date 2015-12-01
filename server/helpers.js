// refactor?

module.exports.isUndefined = function(value) {
  return typeof value === "undefined";
};

module.exports.calcSkipThreshold = function(roomUsers) {
  var userCount = 0;
  var skipVotes = 0;
  var skipThreshold = 0;
  for(user in roomUsers) {
    userCount++;
    if(roomUsers[user].skip) {
      skipVotes++;
    } 
  }
  skipThreshold = Math.floor(userCount/2);
  skipThreshold = skipThreshold < 1 ? 1 : skipThreshold;
  return {
    userCount: userCount,
    skipVotes: skipVotes,
    skipThreshold: skipThreshold
  };
}

module.exports.resetUserVotes = function(roomUsers) {
  for(user in roomUsers) {
    roomUsers[user].skip = false;
  }
}

module.exports.countUsers = function(roomUsers) {
  var userCount = 0;
  for(user in roomUsers) {
    userCount++;
  }
  return userCount;
}
