function isUndefined(value) {
  return typeof value === "undefined";
};

function calcSkipThreshold(roomUsers) {
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

function resetUserVotes(roomUsers) {
  for(user in roomUsers) {
    roomUsers[user].skip = false;
  }
}

function countUsers(roomUsers) {
  var userCount = 0;
  for(user in roomUsers) {
    userCount++;
  }
  return userCount;
}


module.exports = {
  isUndefined: isUndefined,
  calcSkipThreshold: calcSkipThreshold,
  resetUserVotes: resetUserVotes,
  countUsers: countUsers
}