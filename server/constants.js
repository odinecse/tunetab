module.exports.MESSAGES = {
  CONNECTED: function(alias) {
    return alias + ' connected!';
  },
  DISCONNECTED: function(alias) {
    return alias + ' disconnected!';
  },
  SUBMIT_GENERAL_ERROR: 'invalid video url',
  ALREADY_VOTED: 'you\'ve already voted',
  SKIPPING_VIDEO: 'skipping video!',
  NOTHING_TO_SKIP: 'nothing to skip',
  WANTS_TO_SKIP: function(alias) {
    return alias + ' wants to skip this video!';
  }
};

module.exports.YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/';
module.exports.MAX_PREVIOUS_VIDEOS = 15;