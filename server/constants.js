module.exports.MESSAGES = {
  YOUTUBE_API_ERROR: 'unable to contact youtube',
  YOUTUBE_API_ERROR_RELATED: 'unable to contact youtube to find a related video',
  URL_SUBMIT_ERROR: 'invalid video url',
  SUBMIT_DUPLICATE: 'video has already been played, video must be unique',
  SEARCH_SUBMIT_ERROR: 'invalid search term, or search returned nothing',
  SUBMIT_UKNOWN_ERROR: 'unknown submit type, unknown error',
  ALREADY_VOTED: 'you\'ve already voted',
  SKIPPING_VIDEO: 'skipping video!',
  NO_MORE_RECS: 'i\'m out of recommendations! (or your search has already been played)',
  NOTHING_TO_SKIP: 'nothing to skip',
  WANTS_TO_SKIP: function(alias) {
    return alias + ' wants to skip this video!';
  }
};

module.exports.YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/';
module.exports.MAX_PREVIOUS_VIDEOS = 15;