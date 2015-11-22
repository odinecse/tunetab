function isUndefined(value) {
  return typeof value === "undefined";
}

module.exports.isUndefined = isUndefined;

module.exports.calcSkipThreshold = function(roomUsers, reset) {
  var userCount = 0;
  var skipVotes = 0;
  var skipThreshold = 0;
  for(user in roomUsers) {
    userCount++;
    if(!isUndefined(reset)) {
    	roomUsers[user].skip = false;
    } else {
    	if(roomUsers[user].skip) {
	      skipVotes++;
	    }	
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