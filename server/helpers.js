function isUndefined(value) {
  return typeof value === 'undefined';
};

function randomIntBetween(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

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

function removeFromArray(arr, id) {
  var i = arr.indexOf(id);
  if(i > -1) {
    arr.splice(i, 1);
  };
}

function removeFromCollection(collection, id, field) {
  var i = collection.findIndex(function(item) {
    return item[field] === id ? true : false;
  });
  if(i > -1) {
    collection.splice(i, 1);
  };
}


module.exports = {
  isUndefined: isUndefined,
  randomIntBetween: randomIntBetween,
  calcSkipThreshold: calcSkipThreshold,
  resetUserVotes: resetUserVotes,
  countUsers: countUsers,
  removeFromArray: removeFromArray,
  removeFromCollection: removeFromCollection
}