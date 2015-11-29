import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import PlaylistItem from './PlaylistItem';

export default class PreviousVideos extends Component {

  constructor(props) {
    super(props);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  componentDidUpdate() {
    let node = ReactDOM.findDOMNode(this);
    node.scrollTop = node.scrollHeight;
  }

  render() {
    let previous = null;
    let videos = this.props.previousVideos;
    if(videos.length > 0) {
      previous = videos.map(function(video, i) {
        return (
          <PlaylistItem title={video.title}
                        thumb={video.thumb}
                        user={video.user}
                        comment={video.comment} 
                        key={i + video.id} />
        );
      }).reverse();
    }
    return (
      <div id="tt-previous-videos-c" className="tt-ofc">
        <ul id="tt-previous-videos" className="tt-playlist">
          {previous}
        </ul>
      </div>
    );
  }
}