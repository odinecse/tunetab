import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import PlaylistItem from './PlaylistItem';

var init = true;

export default class PreviousVideos extends Component {

  constructor(props) {
    super(props);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.doTheScroll = this.doTheScroll.bind(this);
  }

  componentDidUpdate() {
    if(this.props.skipping || init) {
      this.doTheScroll();
      if(init) {
        init = false;  
      }
    }
  }

  doTheScroll() {
    window.requestAnimationFrame(() => {
      let node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    });
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
      <div id="tt-previous-videos-container" className="tt-overflow-container">
        <ul id="tt-previous-videos" className="tt-playlist">
          {previous}
        </ul>
      </div>
    );
  }
}