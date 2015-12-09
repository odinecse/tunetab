export function isUndefined(value) {
  return typeof value === "undefined";
}

export function isEmpty(object) {
  for(var key in object) {
    if(object.hasOwnProperty(key)){
      return false;
    }
  }
  return true;
}

export function shouldPlaylistUpdate(currentPropsVideos, nextPropsVideos) {
  let oneVideo = currentPropsVideos.slice(0, 1)[0];
  let oneNextVideo = nextPropsVideos.slice(0, 1)[0];
  if(currentPropsVideos.length !== nextPropsVideos.length) {
    return true;
  }
  if(isUndefined(oneVideo)) {
    return true;
  }
  if(!isUndefined(oneVideo) && !isUndefined(oneNextVideo)) {
    if(oneVideo.id === oneNextVideo.id) {
      return false;
    }
  }
  return true;
}
