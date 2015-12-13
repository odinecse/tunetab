import React, { Component } from 'react';
import YoutubePlayer from 'react-youtube-player';

import dataStore from '../../dataStore';
import {isEmpty} from '../../helpers';
import {THE_FACE} from '../../constants';
import outgoingActions from '../../actions/outgoingActions';

var interval = {};

export default class YoutubeContainer extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.clearPing = this.clearPing.bind(this);
    this.setPing = this.setPing.bind(this);
    this.nextVideo = this.nextVideo.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    if(nextProps.current !== null && this.props.current !== null) {
      if(this.props.muted !== nextProps.muted) {
        return true;
      }
      if(this.props.current.id == nextProps.current.id) {
        return false;
      }
    }
    return true;
  }

  componentDidUpdate() {
    this.clearPing();
  }

  clearPing() {
    console.log('clearPing');
    window.clearInterval(interval)
  }

  setPing() {
    console.log('setPing');
    if(isEmpty(interval)) {
      interval = window.setInterval(() => {
        let promise = this.player.getCurrentTime();
        promise.then(function(time) {
          outgoingActions.tick({videoTime: time || 0});
          dataStore.setVideoTimeSilent({videoTime: time || 0});
        });
      }, 400);
    }
  }

  nextVideo() {
    this.clearPing();
    dataStore.setVideoTimeSilent({videoTime: 0});
    outgoingActions.playNextVideo({videoId: this.props.current.id});
  }

  render() {
    let player = null;
    let title = THE_FACE;
    let mute = this.props.muted;
    if(this.props.current) {
      title = this.props.current.title;
      player = <YoutubePlayer ref={(player) => {
                                if(player !== null) {
                                  this.player = player.player;
                                  this.player.seekTo(this.props.videoTime);
                                  if(mute) {
                                    this.player.mute();
                                  } else {
                                    this.player.unMute();
                                  }
                                }
                              }}
                              videoId={this.props.current.id}
                              configuration={
                                {
                                  controls: 0,
                                  disablekb: 1,
                                  autoplay: 1,
                                  enablejsapi: 1,
                                  fs: 1,
                                  modestbranding: 1,
                                  playsinline: 1,
                                  rel: 0,
                                  showinfo: 0
                                }}
                              onEnd={this.nextVideo}
                              onPlay={this.setPing}
                              onPause={this.clearPing}
                              onError={this.clearPing}
                              playbackState='playing' />
    }
    return (
      <div id="tt-ytplayer-container" className="tt-sideways-container">
        <h1 className="tt-sideways">{title}</h1>
        {player}
      </div>
    );
  }

}
