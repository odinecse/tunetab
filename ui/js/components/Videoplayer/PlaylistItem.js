import React, { Component } from 'react';

export default class PlaylistItem extends Component {
  render() {
    return (
      <li className="tt-playlistitem">
        <h4>{this.props.title}</h4>
        <img  height={this.props.thumb.height}
              width={this.props.thumb.width}
              src={this.props.thumb.url} />
        submitted by: {this.props.user}
      </li>
    );
  }
}
