module.exports.MESSAGES = {
  URL_SUBMIT_ERROR: 'invalid video url',
  SUBMIT_DUPLICATE: 'video has already been played, video must be unique',
  SEARCH_SUBMIT_ERROR: 'invalid search term, or search returned nothing',
  SUBMIT_UKNOWN_ERROR: 'unknown submit type, unknown error',
  ALREADY_VOTED: 'you\'ve already voted',
  NO_MORE_RECS: 'i\'m out of recommendations! (or your search has already been played)',
  NOTHING_TO_SKIP: 'nothing to skip',
  YOUTUBE_API_ERROR: function(message) {
    return 'unable to contact youtube, ' + message;
  },
  SKIPPING_VIDEO: function(alias) {
    return 'video skipped by ' + alias;
  },
  WANTS_TO_SKIP: function(alias) {
    return alias + ' wants to skip this video!';
  },
  SUBMITTED_ANNOUNCEMENT: function(title, alias) {
    return '"' + title + '" submitted by ' + alias;
  },
  NOW_PLAYING: function(title, alias) {
    return 'now playing: "' + title + '" submitted by ' + alias;
  },
};

module.exports.YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/';
module.exports.MAX_PREVIOUS_VIDEOS = 15;