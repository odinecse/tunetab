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
      <div id="tt-skipvideo">
        <div>
          (votes: {this.props.skipVotes}, required: {this.props.skipThreshold})
        </div>
        <button onClick={this.skipVideo} disabled={disabled}>
          <i className="fa fa-fast-forward"></i> Skip Video
        </button>
      </div>
    );
  }
}
