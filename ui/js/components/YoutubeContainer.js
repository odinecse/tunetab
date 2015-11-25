import React, { Component } from 'react';
import YoutubePlayer from 'react-youtube-player';

export default class YoutubeContainer extends Component {
  render() {
    let player = null;
    if(this.props.current) {
      player = <YoutubePlayer videoId={this.props.current.id}
                              configuration={
                                {
                                  autoplay: 1,
                                  controls: 0,
                                  disablekb: 1,
                                  enablejsapi: 1,
                                  fs: 0,
                                  modestbranding: 1,
                                  playsinline: 1,
                                  rel: 0,
                                  showinfo: 0
                                }}
                              playbackState='playing' />
    }
    return (
      <div>
        {player}
      </div>
    );
  }
}