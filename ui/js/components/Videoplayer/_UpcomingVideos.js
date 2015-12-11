import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import dataStore from '../../dataStore';
import {shouldPlaylistUpdate} from '../../helpers';
import PlaylistItem from './_PlaylistItem';


export default class UpcomingVideos extends Component {

  constructor(props) {
    super(props);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    if(this.props.submitted !== nextProps.submitted) return true;
    return shouldPlaylistUpdate(this.props.upcomingVideos, nextProps.upcomingVideos);
  }

  componentDidUpdate() {
    this.refs.overflow.scrollTop = 0;
  }

  render() {
    let upcoming = null;
    let videos = this.props.upcomingVideos;
    let flash = this.props.submitted;
    if(videos.length > 0) {
      upcoming = videos.map(function(video, i) {
        return (
          <PlaylistItem title={video.title}
                        thumb={video.thumb}
                        user={video.user}
                        key={video.id + i} />
        );
      });
    }
    return (
      <div  id="tt-upcoming-videos-container"
            className="tt-playlist-container tt-sideways-container">
        <h2 className="tt-sideways">upcoming</h2>
        <div className="tt-overflow-container" ref="overflow">
          <div className={classNames({
            'tt-container-flash': true,
            'tt-container-flash-animation': flash,
          })} ></div>
          <ul id="tt-upcoming-videos" className="tt-playlist">
            {upcoming}
          </ul>
        </div>
      </div>
    );
  }

}
