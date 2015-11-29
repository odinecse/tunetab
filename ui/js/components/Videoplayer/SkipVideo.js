import React, { Component } from 'react';
import classNames from 'classnames';

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
    return (
      <div id="tt-skipvideo" className="pull-left">
        <a href="#" className={
                      classNames({
                        "tt-btn": true,
                        "tt-btn-big": true,
                        "disabled": this.props.userVoted || !this.props.skipAllowed
                      })
                    } 
                    onClick={this.skipVideo} >
          <i className="fa fa-fast-forward"></i> Skip Video
        </a>
        <span className="tt-small-txt">
          (votes: {this.props.skipVotes}, required: {this.props.skipThreshold})
        </span>
      </div>
    );
  }
}
