import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {isUndefined} from '../../helpers';
import PlaylistItem from './_PlaylistItem';

export default class PreviousVideos extends Component {

  constructor(props) {
    super(props);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    let oneVideo = this.props.previousVideos.slice(0, 1)[0];
    let oneNextVideo = nextProps.previousVideos.slice(0, 1)[0];
    if(this.props.previousVideos.length !== nextProps.previousVideos.length) {
      return true
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

  componentDidUpdate() {
    this.refs.overflow.scrollTop = this.refs.overflow.scrollHeight;
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
                        key={i + video.id} />
        );
      }).reverse();
    }
    return (
      <div  id="tt-previous-videos-container"
            className="tt-playlist-container tt-sideways-container">
        <h2 className="tt-sideways">previous</h2>
        <div className="tt-overflow-container" ref="overflow">
          <ul id="tt-previous-videos" className="tt-playlist">
            {previous}
          </ul>
        </div>
      </div>
    );
  }

}
