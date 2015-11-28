import React, { Component } from 'react';

import PlaylistItem from './PlaylistItem';

export default class PreviousVideos extends Component {

  render() {
    let previous = null;
    let videos = this.props.previousVideos;
    if(videos.length > 0) {
      previous = videos.map(function(video) {
        return (
          <PlaylistItem title={video.title}
                        thumb={video.thumb}
                        user={video.user}
                        comment={video.comment} 
                        key={video.id} />
        );
      }).reverse();
    }
    return (
      <ul id="tt-previous-videos">
        {previous}
      </ul>
    );
  }
}