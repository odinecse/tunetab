import React, { Component } from 'react';

export default class PlaylistItem extends Component {

  render() {
    return (
      <li className="tt-playlistitem">
        <h4>{this.props.title}</h4>
        <img  className="tt-playlistitem-img"
              src={this.props.thumb.url} />
        <div className="tt-playlistitem-meta">
          submitted by: {this.props.user}
        </div>
      </li>
    );
  }

}
