import React, { Component } from 'react';

import dataStore from '../../dataStore';

export default class SkipVideo extends Component {

  constructor(props) {
    super(props);
    this.skipVideo = this.skipVideo.bind(this);
  }

  skipVideo(e) {
    dataStore.emitSkipVideo();
  }

  render() {
    let disabled = this.props.userVoted ? 'disabled' : '';
    return (
      <div id="tt-skipvideo" className="pull-left">
        <a href="#" className="tt-btn" 
                    onClick={this.skipVideo} 
                    disabled={disabled}>
          <i className="fa fa-fast-forward"></i> Skip Video
        </a>
        <span className="small-txt">
          (votes: {this.props.skipVotes}, required: {this.props.skipThreshold})
        </span>
      </div>
    );
  }
}
